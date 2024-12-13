import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Treanding from "./components/Treanding";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import Tvshow from "./components/Tvshow";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import PersonDetails from "./components/PersonDetails";
import TvDetails from "./components/TvDetails";
import Trailer from "./components/partials/Trailer";
import About from "./components/About";


const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treanding" element={<Treanding />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshow />} />

        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="/about" element={<About />} />        
      </Routes>
    </div>
  );
};

export default App;
