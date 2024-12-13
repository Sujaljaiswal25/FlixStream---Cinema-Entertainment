import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson } from "../store/actions/personAction";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "./Loading";
import { FaFacebook, FaImdb, FaInstagram, FaTwitter } from "react-icons/fa";
import HorizontalCard from "./partials/HorizontalCards";
import NoImage from "/noimage.jpg";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-full min-h-screen overflow-x-hidden px-4 md:px-[10%] py-3">
      {/* Part 1 navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 items-center mb-10 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#1d7437] mr-5 border-2 p-[3px] border-zinc-400 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
        ></Link>

        {info.externalid?.facebook_id && (
          <a
            title="Facebook"
            target="_blank"
            href={`https://facebook.com/${info.externalid.facebook_id}`}
            className="p-3 rounded-full bg-blue-600"
          >
            <FaFacebook />
          </a>
        )}

        {info.externalid?.instagram_id && (
          <a
            title="Instagram"
            target="_blank"
            href={`https://instagram.com/${info.externalid.instagram_id}`}
            className="p-3 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500"
          >
            <FaInstagram />
          </a>
        )}

        {info.externalid?.twitter_id && (
          <a
            title="Twitter"
            target="_blank"
            href={`https://twitter.com/${info.externalid.twitter_id}`}
            className="p-3 rounded-full bg-blue-400"
          >
            <FaTwitter />
          </a>
        )}

        {info.externalid?.imdb_id && (
          <a
            title="IMDB"
            target="_blank"
            href={`https://www.imdb.com/name/${info.externalid.imdb_id}/`}
            className="p-3 rounded-full bg-black"
          >
            <FaImdb className="text-yellow-300" />
          </a>
        )}
      </nav>

      {/* Part 2 Person Details */}
      <div className="w-full flex flex-col md:flex-row gap-10">
        <img
          className="h-[60vh] w-full md:w-56 border-2 border-white rounded-md object-cover"
          src={
            info.detail.profile_path || info.detail.backdrop_path
              ? `https://image.tmdb.org/t/p/original${
                  info.detail.profile_path || info.detail.backdrop_path
                }`
              : NoImage
          }
          alt={info.detail.name || "Person image"}
        />

        <div className="w-full">
          <h1 className="text-3xl md:text-5xl text-white font-black">
            {info.detail.name || "Name not available"}
          </h1>

          <div className="mt-3 text-white">
            {info.detail.biography ? (
              <>
                <h1 className="text-2xl font-semibold">Biography</h1>
                <p className="mt-3">{info.detail.biography}</p>
              </>
            ) : (
              <p>Biography not available</p>
            )}
          </div>

          <h1 className="text-2xl text-white my-5 font-semibold">
            Personal Info
          </h1>
          <h3 className="text-xl text-gray-400 font-semibold">
            Known for -{" "}
            <span className="text-zinc-100">
              {info.detail.known_for_department}
            </span>
          </h3>
          <h3 className="text-lg text-gray-400 font-semibold">
            Birthday -{" "}
            <span className="text-zinc-100">{info.detail.birthday}</span>
          </h3>
          <h3 className="text-lg text-gray-400 font-semibold">
            Birth Place -{" "}
            <span className="text-zinc-100">{info.detail.place_of_birth}</span>
          </h3>
          <h3 className="text-lg text-gray-400 font-semibold">
            Gender -{" "}
            <span className="text-zinc-100">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </span>
          </h3>
          <h3 className="text-lg text-gray-400 font-semibold">
            Also Known as -{" "}
            <span className="text-zinc-100">
              {info.detail.also_known_as.join(", ")}
            </span>
          </h3>
        </div>
      </div>

      <hr className="mt-10 border-none h-[2px] bg-zinc-400 mb-3" />

      <div className="w-full mt-5 flex justify-between">
        <h1 className=" text-xl text-white font-semibold ">Acting</h1>

        <Dropdown
          title="Catgory"
          options={["tv", "movie"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl mb-5  border-2 border-zinc-700 p-5">
        {info[category + "Credits"].cast.map((c, i) => (
          <li
            key={i}
            className="hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer"
          >
            <Link to={`/${category}/details/${c.id}`} className="">
              <span>
                {" "}
                {c.name || c.title || c.original_name || c.original_title}
              </span>

              <span className="block ml-5 mt-2">
                {c.character && `Character Name:  ${c.character}`}
              </span>
            </Link>
          </li>
        ))}
      </div>

      <hr className="m-7 border-none h-[2px] bg-zinc-400 mb-3" />

      {/* Part 3 Movies */}
      {info.combinedCredits?.cast && info.combinedCredits.cast.length > 0 && (
        <div className="mt-5">
          <h1 className="text-2xl my-5 font-bold text-white">
            Actor's Movies & TV Shows
          </h1>
          <HorizontalCard
            data={info.combinedCredits.cast}
            title={
              info.detail.known_for_department === "Acting" ? "cast" : "crew"
            }
          />
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
