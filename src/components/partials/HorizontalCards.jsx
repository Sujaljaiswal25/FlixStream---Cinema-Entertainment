import React from "react";
import { Link } from "react-router-dom";
import Noimage from "/noimage.jpg";

const HorizontalCards = ({ data, title }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-[100%] flex mb-5 p-2 overflow-y-hidden">
      {data.map((d, i) => (
        <Link 
          to={`/${d.media_type || 'movie'}/details/${d.id}`}
          key={`${d.id}-${i}-${d.media_type || 'movie'}`}
          className="min-w-[18%] mb-8 hover:scale-105 transition duration-700 ease-in-out ... overflow-hidden p-1 rounded-md bg-zinc-900 mr-4"
        >
          <img className=' min-h-[55%] object-cover  object-center ' src={ d.backdrop_path || d.poster_path ?  `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}` : Noimage } alt="" />
          <div className="text-white h-[55%] p-1">
            <h1 className="font-semibold text-lg">
              {d.title || d.name || 'Untitled'}
            </h1>
            <p className="text-sm leading-5 mt-2 text-zinc-300 font-medium">
              {d.overview.slice(0, 100)}...
              <span className="text-zinc-500 ">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;




