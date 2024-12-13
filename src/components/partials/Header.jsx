import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  //   console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col items-start justify-end p-[2%] pl-10"
    >
      <h1 className="font-semibold w-[70%] text-4xl text-white">
        {data.name || data.title || data.orignal_name || data.orignal_title}
      </h1>
      <p className="w-[50%] text-sm leading-5 mt-3 text-white font-medium">
        {data.overview.slice(0, 100)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-500 "
        >
          more
        </Link>
      </p>
      <h4 className="text-white text-lg flex leading-4 mt-2 items-center justify-center gap-2 ">
        <p className="text-sm"> {data.release_date}</p>
        <p className="text-sm">{data.media_type.toUpperCase()}</p>
      </h4>

      <Link to={`/${data.media_type}/details/${data.id}${data.release_date ? "/trailer" : ''}`} className="p-2 text-xs rounded-full mt-2 text-white font-semibold bg-[#1d7437]">
      { data.release_date ? "Watch Trailer" :"Know More"  }
      </Link>
    </div>
  );
};

export default Header;
