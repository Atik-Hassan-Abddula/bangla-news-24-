
export default function Loading() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <span className="rounded-lg bg-red-600 px-3 py-2 text-2xl font-black text-white">
          BN
        </span>

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Bangla <span className="text-red-600">News 24</span>
        </h1>
      </div>

      {/* Spinner */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
        <div className="h-3 w-3 rounded-full bg-red-600" />
      </div>

      {/* Loading Text */}
      <h2 className="mt-6 text-lg font-bold text-gray-800">
        খবর লোড হচ্ছে...
      </h2>

      <p className="mt-2 text-center text-sm text-gray-500">
        সর্বশেষ সংবাদ জানতে একটু অপেক্ষা করুন।
      </p>

      {/* Animated Progress Bar */}
      <div className="mt-6 h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-gray-200">
        <div className="loading-progress h-full w-1/3 rounded-full bg-red-600" />
      </div>

      <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-gray-400">
        PLEASE WAIT
      </p>
    </main>
  );
}
