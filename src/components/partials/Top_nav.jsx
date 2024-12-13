import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import no_image from "/noimage.jpg";

const Top_nav = ({ Placeholder }) => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [loading, setloading] = useState(false);

  const debounceTimeout = React.useRef(null);

  const GetSearches = async (searchQuery) => {
    try {
      setloading(true);
      const { data } = await axios.get(`/search/multi?query=${searchQuery}`);
      setsearches(data.results || []);
      setloading(false);
    } catch (error) {
      console.error("Error: ", error);
      setloading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (query.trim().length > 0) {
      debounceTimeout.current = setTimeout(() => {
        GetSearches(query.trim());
      }, 500); // Adjust debounce delay as needed
    } else {
      setsearches([]);
    }
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i
        className="text-zinc-400 text-xl ri-search-2-line"
        aria-label="Search icon"
      ></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-white outline-none border-none bg-zinc-800 rounded-full pl-5 p-2 mx-8"
        type="text"
        placeholder={Placeholder}
        aria-label="Search input"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-xl ri-close-line cursor-pointer"
          aria-label="Clear search"
        ></i>
      )}

      {query.trim().length > 0 && (
        <div className="absolute w-[48%] max-h-[50vh] bg-gray-400 top-[100%] left-[7.5%] rounded overflow-auto z-50 shadow-lg">
          {loading && (
            <p className="text-center text-zinc-800 py-2">Loading...</p>
          )}

          {!loading && searches.length === 0 && (
            <p className="text-center text-zinc-800 py-2">No results found</p>
          )}

          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-white hover:bg-[#1d7437] duration-300 font-bold text-zinc-800 w-full p-4 flex items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] mr-4 h-[10vh] object-cover rounded-md shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : no_image
                }
                alt={s.name || s.title || "No image available"}
              />
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Top_nav;

