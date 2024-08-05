import React, { useState } from "react";
import "../App.css";
import ReactModal from "react-modal";
import { getDetailMovie } from "../redux/actions/movieAction";
import { connect } from "react-redux";

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    zIndex: 1000,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  overlay: {
    zIndex: 999,
  },
};

const MovieCard = ({ detailMovie, getDetailMovie, isLoading, movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailMovie = (imdbID) => {
    setIsModalOpen(true);
    getDetailMovie(imdbID);
  };

  return (
    <>
      <div className="movie" onClick={() => openDetailMovie(movie.imdbID)}>
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400"
            }
            alt="movie-poster"
          />
        </div>
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <div className="flex flex-col overflow-y-auto py-5 min-[256px]:w-96">
          {detailMovie ? (
            <div>
              <div className="flex flex-col items-center mb-3">
                <img
                  src={detailMovie.Poster}
                  alt="Movie Poster"
                  className="w-48 h-56 mb-1 text-center rounded-lg"
                />
                <p className="font-extrabold text-2xl border-2 border-blue-600">
                  {detailMovie.Title}
                </p>
                <p className="font-bold text-lg">({detailMovie.Year})</p>
              </div>

              <div className="flex gap-x-3 text-start w-full">
                <div className="w-1/3">
                  <p>Released</p>
                  <p>Length</p>
                  <p>Genre</p>
                  <p>Director</p>
                  <p>Writer</p>
                  <p>Country</p>
                  <p>Actors</p>
                  <p>IMDB Rating</p>
                  <p>Plot</p>
                </div>
                <div>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div>
                  <p>{detailMovie.Released}</p>
                  <p>{detailMovie.Runtime}</p>
                  <p>{detailMovie.Genre}</p>
                  <p>{detailMovie.Director}</p>
                  <p>{detailMovie.Writer}</p>
                  <p>{detailMovie.Country}</p>
                  <p className="w-52 truncate hover:overflow-visible hover:whitespace-normal">{detailMovie.Actors}</p>
                  <p>
                    {detailMovie.imdbRating}({detailMovie.imdbVotes})
                  </p>
                  <p className="w-56 truncate hover:overflow-visible hover:whitespace-normal">
                    {detailMovie.Plot}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            "kosong"
          )}
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-sky-600 py-3 rounded-md mt-7 text-white font-bold text-xl hover:bg-sky-900"
          >
            Close
          </button>
        </div>
      </ReactModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  detailMovie: state.movie.detailMovie,
  isError: state.movie.isError,
  isLoading: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailMovie: (idImdb) => dispatch(getDetailMovie(idImdb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
