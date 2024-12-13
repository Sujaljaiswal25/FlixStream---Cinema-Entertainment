


import React from "react";
import { Link } from "react-router-dom";
import Noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-[5%] bg-[#1F1E24] overflow-hidden">
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="w-[30vh] hover:scale-105 transition duration-700 ease-in-out"
            key={i}
          >
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover w-full rounded-lg"
              src={
                c.backdrop_path || c.poster_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original${
                      c.backdrop_path || c.poster_path || c.profile_path
                    }`
                  : Noimage
              }
              alt={c.name || c.title || c.original_name || c.original_title}
            />

            <h1 className="text-zinc-200 text-lg mt-3 font-semibold text-center">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>

            {c.vote_average && (
              <div className="text-zinc-200 font-semibold text-sm text-center">
                <span className="text-yellow-400">RATING: </span>
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;

