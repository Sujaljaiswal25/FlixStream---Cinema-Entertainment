import React from "react";
import { FaGithub, FaLinkedin, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  document.title = " FlixStream | About Us ";
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-fit md:min-h-screen overflow-x-hidden p-2 bg-customblack text-zinc-100">
      {/* <FaRegArrowAltCircleLeft
        onClick={() => navigate(-1)}
        className="hover:text-custompurple md:ml-40 md:my-0 my-2 text-zinc-200 text-3xl duration-100   cursor-pointer"
      /> */}

      

      <div className="max-w-4xl bg-customblack mx-auto">
      <Link
        onClick={() => navigate(-1)}
        className="ri-arrow-left-line hover:text-[#1d7437] mb-5 mr-5 border-2 p-[3px] border-zinc-400 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
      ></Link>
        <h1 className="text-4xl font-bold  mb-4">About FlixStream</h1>
        <p className="text-lg mb-4">
          Welcome to FlixStream, your ultimate destination for exploring a vast
          collection of movies and TV shows. Powered by React, Tailwind CSS, and
          the TMDB API, FlixStream offers an unparalleled entertainment
          experience. Here are some of its key features:
        </p>

        <h2 className="text-3xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Trending:</strong> Discover the latest trending movies and
            TV shows.
          </li>
          <li>
            <strong>Popular:</strong> Explore popular movies and TV shows that
            everyone is talking about.
          </li>
          <li>
            <strong>TV Shows:</strong> Browse a wide range of TV shows, from the
            latest hits to all-time classics.
          </li>
          <li>
            <strong>Movies:</strong> Find detailed information about movies,
            including trailers, cast, and crew.
          </li>
          <li>
            <strong>Persons:</strong> Learn about popular personalities, their
            biographies, and filmographies.
          </li>
          <li>
            <strong>Watch Trailers:</strong> Watch trailers of your favorite
            movies and TV shows directly on the platform.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>React:</strong> A JavaScript library for building user
            interfaces.
          </li>
          <li>
            <strong>React-Redux:</strong> state management library that connects
            React components to a centralized store.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> A utility-first CSS framework for
            styling the application.
          </li>
          <li>
            <strong>TMDB API:</strong> An API that provides detailed information
            about movies, TV shows, and personalities.
          </li>
        </ul>

        <div className="flex bg-customblack gap-x-3">
          <h2 className="text-3xl font-semibold mb-2">Meet Sujal Jaiswal → </h2>
          <div className="flex text-2xl items-center bg-customblack  gap-2">
            {" "}
            <a
              className="hover:text-custompurple duration-100"
              href="https://www.linkedin.com/in/sujaljaiswal25/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              className="hover:text-custompurple duration-100"
              href="https://github.com/Sujaljaiswal25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <p className="text-lg bg-customblack ">
          This project is created by{" "}
          <span className="text-blue-400">Sujal Jaiswal</span>, a dedicated
          Full Stack Developer with a keen interest in building dynamic and
          user-friendly web applications. Connect with Sujal to stay updated on
          future projects and developments:{" "}
        </p>
        <div className="flex bg-customblack gap-2"></div>

        <p className="text-lg">
          Note: FlixStream does not promote or share any copyrighted content.
        </p>
      </div>
    </div>
  );
};

export default About;

