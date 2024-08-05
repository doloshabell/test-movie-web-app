import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../App.css";

import { getListMovie } from "../redux/actions/movieAction";

import MovieCard from "../components/MovieCard";
import searchIcon from "../assets/search.svg";

function ListMovies(props) {
  const [isStartFetchData, setIsStartFetchData] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (isStartFetchData) {
        await props.getListMovie("2024");
        setIsStartFetchData(false);
      }
    };

    fetchData()

    // eslint-disable-next-line
  }, [isStartFetchData]);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter the movie name"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search-icon"
          onClick={() => props.getListMovie(searchTitle)}
        />
      </div>

      {props.isLoading && <div className="empty">Loading...</div>}

      {props.listMovies === null ? (
        <div className="empty">No movies found</div>
      ) : (
        <div className="container">
          {props.listMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isError: state.movie.isError,
  isLoading: state.movie.isLoading,
  listMovies: state.movie.listMovies,
});

const mapDispatchToProps = (dispatch) => ({
  getListMovie: (title) => dispatch(getListMovie(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListMovies);
