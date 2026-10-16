import { Span } from 'next/dist/trace';
import Image from 'next/image';
import React from 'react';

const MainNews = ({news}) => {
    const firsNes = news[0]
    const otherNews = news.slice(1)
    console.log(news)
    return (
        <div className="flex gap-5 ">
            <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <Image
      src={firsNes.imageUrl} height={600} width={600}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firsNes.title}</h2>
    <p>{firsNes.description}</p>
   
  </div>
</div>

<div >
    {
        otherNews.slice(1,8).map(on=> <span key={on.id} className='card bg-base-100 border border-gray-300 py-5'>
            <span>{on.title}</span>
        </span>)
    }
</div> 

 </div>
    );
};

export default MainNews;