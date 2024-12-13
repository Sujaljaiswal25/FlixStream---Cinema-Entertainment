import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv } from "../store/actions/tvAction";
import { loadtv, removetv } from "../store/reducers/tvSlice";
import Loading from "./Loading";
import { FaImdb } from "react-icons/fa";
import HorizontalCard from "../components/partials/HorizontalCards";
import { FaCirclePlay } from "react-icons/fa6";
import NoImage from "../../public/noimage.jpg";

const TvDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path || ""
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full relative min-h-screen py-3 px-2 md:px-[5%] lg:px-[10%] overflow-x-hidden"
    >
      {/* Part 1 navigation bar */}
      <nav className="w-full h-[10vh] text-zinc-100 items-center mb-10 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#1d7437]  mr-5 border-2 p-[3px]  border-zinc-400 rounded-full w-9 h-9 flex justify-center items-center "
        ></Link>

        <a title="Official website" target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill hover:text-[#1d7437]  mr-5 border-2 p-[3px]  border-zinc-400 rounded-full w-9 h-9 flex justify-center items-center"></i>
        </a>

        <a
          title="Wikipedia"
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill hover:text-[#1d7437]  mr-5 border-2 p-[3px]  border-zinc-400 rounded-full w-9 h-9 flex justify-center items-center"></i>
        </a>

        {/* <a  target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a> */}
        <a
          title="IMDB"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="p-3 rounded-full bg-black"
        >
          <FaImdb className="text-yellow-300 " />
        </a>
      </nav>
      {/* Part 2 poster and details*/}
      <div className="w-full flex flex-col md:flex-row gap-5 lg:gap-10 py-5">
        <img
          className="h-[60vh] w-full max-w-[300px] mx-auto md:w-56 border-2 border-white rounded-md object-cover"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path || ""
          }`}
          alt={info.detail.title || info.detail.name || "tv poster"}
        />
        <div className="flex flex-col gap-y-2 text-white w-full">
          <h1 className="text-white text-3xl md:text-5xl font-black uppercase">
            {info.detail.original_title ||
              info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              "Untitled"}
            <small className="text-xl md:text-2xl text-zinc-200">
              {" "}
              {info.detail.first_air_date
                ? `(${info.detail.first_air_date.split("-")[0]})`
                : ""}{" "}
            </small>
          </h1>

          {/* tv Details */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="text-white border-red-600 border-2 w-fit opacity-90 rounded-full">
              <p className="text-sm font-normal px-2 py-3">
                {info.detail.vote_average
                  ? `${(info.detail.vote_average * 10).toFixed()}%`
                  : "N/A"}
              </p>
            </div>
            <h3 className="text-zinc-200 font-semibold">User Score</h3>
            <h1 className="text-lg md:text-xl font-semibold text-yellow-600">
              {info.detail.first_air_date || "Release date not available"}
            </h1>
            <h2 className="text-lg md:text-xl font-normal text-zinc-300">
              {info.detail.genres?.length > 0
                ? info.detail.genres.map((g) => g.name).join(", ")
                : "Genre not available"}
            </h2>
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">
              {info.detail.runtime
                ? `${info.detail.runtime} min`
                : "Duration not available"}
            </h2>
          </div>
          <h2 className="text-xl text-zinc-200 font-semibold italic">
            {info.detail.tagline || ""}
          </h2>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p>{info.detail.overview || "No overview available"}</p>

          <h2 className="text-2xl font-semibold">Show translated in : </h2>
          <p>{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="hover:bg-[#1d7437] duration-100 flex items-center gap-1 bg-custompurple w-fit px-4 rounded-xl py-2"
          >
            <FaCirclePlay /> Play Trailer
          </Link>
        </div>
      </div>
      {/* Part 3  avilable platforms*/}
      <div className="w-full mt-3 flex flex-col gap-y-3">
        {info.watchproviders?.flatrate &&
          info.watchproviders.flatrate.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
              <h1 className="text-sm font-bold text-zinc-100">
                Available on Platform :
              </h1>
              {info.watchproviders.flatrate.map((w) => (
                <img
                  key={w.logo_path}
                  title={w.provider_name}
                  className="h-7 cursor-pointer rounded-md w-7 object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

        {info.watchproviders?.rent && info.watchproviders.rent.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <h1 className="text-sm font-bold text-zinc-100">
              Available on Rent :
            </h1>
            {info.watchproviders.rent.map((w) => (
              <img
                key={w.logo_path}
                title={w.provider_name}
                className="h-7 cursor-pointer rounded-md w-7 object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.buy && info.watchproviders.buy.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <h1 className="text-sm font-bold text-zinc-100">
              Available to Buy :
            </h1>
            {info.watchproviders.buy.map((w) => (
              <img
                key={w.logo_path}
                title={w.provider_name}
                className="h-7 cursor-pointer rounded-md w-7 object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-7 border-none h-[2px] bg-zinc-400 mb-3" />

      {/* Seasons */}
      <div className="w-full overflow-x-auto py-2">
        <h1 className="text-2xl font-bold text-white mb-4">Seasons</h1>
        <div className="w-full flex gap-5 pb-4">
          {info.detail.seasons.map((s, i) => (
            <div className="min-w-[200px] max-w-[250px] flex-shrink-0" key={i}>
              <img
                className="w-full h-56 object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-center rounded-lg"
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/original${s.poster_path}`
                    : NoImage
                }
                alt={
                  s.name ||
                  info.detail.name ||
                  s.original_name ||
                  s.original_title
                }
              />
              <h1 className="text-custompurple text-white justify-self-center text-lg font-semibold uppercase">
                {s.name ||
                  info.detail.name ||
                  s.original_name ||
                  s.original_title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <hr className="mt-7 border-none h-[2px] bg-zinc-400 mb-3" />

      {/* Part 4 recommended and similar tv shows */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {info.recommendations.length > 0 ? "Recommended" : "Similar"}
        </h1>
        <HorizontalCard
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
