import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  return (
    <div className="h-screen w-screen flex items-center justify-center absolute top-0 left-0 bg-[rgba(0,0,0,0.8)] z-40">
      {/* Close Button */}
      <IoMdCloseCircleOutline
        onClick={() => navigate(-1)}
        className="text-zinc-200 text-4xl absolute top-5 right-5 md:top-10 md:right-10 cursor-pointer hover:text-custompurple transition duration-200"
      />

      {/* Video Container */}
      <div className="relative w-11/12 md:w-9/12 lg:w-7/12 h-3/4 md:h-4/6">
        {ytvideo ? (
          <ReactPlayer
            controls
            height="100%"
            width="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            config={{
              youtube: {
                playerVars: {
                  origin: window.location.origin,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  enablejsapi: 0,
                },
              },
            }}
          />
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default Trailer;

