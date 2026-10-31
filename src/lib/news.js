export const NEWS_API_BASE = "https://news-api-v2.vercel.app";
export const NEWS_REVALIDATE = 60;

export function isArticle(item) {
  if (!item || !item.id || item.type === "link") return false;

  // BBC live pages have no article body and cannot be rendered on a detail page.
  if (typeof item.link === "string" && item.link.includes("/live/")) return false;

  return true;
}

export const NEWS_PLACEHOLDER_IMAGE = "/news-placeholder.svg";

export function isValidImageUrl(value) {
  if (typeof value !== "string") return false;

  const url = value.trim();
  if (!url) return false;

  return (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("/")
  );
}

export function getImageKey(value) {
  if (!isValidImageUrl(value)) return "";

  // BBC serves the same asset as `photo.jpg.webp` (featured) and `photo.jpg`
  // (body block), so normalize the extension before comparing.
  return value
    .trim()
    .split("#")[0]
    .split("?")[0]
    .replace(/\.webp$/i, "");
}

export function getArticleImageUrl(article) {
  return isValidImageUrl(article?.imageUrl)
    ? article.imageUrl
    : NEWS_PLACEHOLDER_IMAGE;
}

export function removeDuplicateImages(blocks, featuredImageUrl) {
  const seen = new Set();
  const featuredKey = getImageKey(featuredImageUrl);

  if (featuredKey) seen.add(featuredKey);

  const clean = (items) =>
    (Array.isArray(items) ? items : []).flatMap((block) => {
      if (!block || typeof block !== "object") return [];

      if (block.type === "image") {
        const url = block.url || block.src;

        if (!isValidImageUrl(url)) return [];

        const key = getImageKey(url);
        if (!key || seen.has(key)) return [];

        seen.add(key);
        return [{ ...block, url }];
      }

      if (Array.isArray(block.blocks)) {
        return [{ ...block, blocks: clean(block.blocks) }];
      }

      if (Array.isArray(block.model)) {
        return [{ ...block, model: clean(block.model) }];
      }

      if (Array.isArray(block.model?.blocks)) {
        return [
          {
            ...block,
            model: { ...block.model, blocks: clean(block.model.blocks) },
          },
        ];
      }

      return [block];
    });

  return clean(blocks);
}

export async function fetchNewsApi(path) {
  try {
    const response = await fetch(`${NEWS_API_BASE}${path}`, {
      next: { revalidate: NEWS_REVALIDATE },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

export function extractText(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (typeof blocks !== "object") return "";

  if (Array.isArray(blocks)) {
    return blocks.map(extractText).filter(Boolean).join("\n\n");
  }

  if (Array.isArray(blocks.blocks)) {
    return extractText(blocks.blocks);
  }

  if (blocks.model) {
    return extractText(blocks.model);
  }

  return typeof blocks.text === "string" ? blocks.text : "";
}

export function getArticleSummary(article) {
  if (!article) return "";

  const description = extractText(article.description).trim();
  if (description) return description;

  if (typeof article.text === "string") {
    return article.text.split(/\n\s*\n/)[0]?.trim() || "";
  }

  return "";
}

export function getArticleAuthor(article) {
  const byline = Array.isArray(article?.byline)
    ? article.byline.map((person) => person?.name).filter(Boolean)
    : [];

  return byline.join(", ") || article?.source || "বাংলা নিউজ ২৪";
}

export function getArticleCategory(article) {
  return article?.topics?.[0]?.name || article?.category || "সংবাদ";
}

export function formatBanglaDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }).format(date);
}

export function getRelatedNews(allNews, article, limit = 3) {
  const topicNames = new Set([
    ...(Array.isArray(article?.topics)
      ? article.topics.map((topic) => topic?.name).filter(Boolean)
      : []),
    ...(Array.isArray(article?.tags) ? article.tags : []),
  ]);

  return (Array.isArray(allNews) ? allNews : [])
    .filter((item) => isArticle(item) && item.id !== article?.id)
    .map((item, index) => ({
      item,
      index,
      score: topicNames.has(item.category) ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ item }) => item);
}
