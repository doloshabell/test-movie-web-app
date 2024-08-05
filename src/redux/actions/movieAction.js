import axios from "axios";

import { API_KEY, API_URL } from "../../services/api";

export const getListMovie = (title) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_START" });
      const responseMovies = await axios.get(
        `${API_URL}?apikey=${API_KEY}&s=${title}`
      );

      if (responseMovies.data.Response === "False") {
        dispatch({
          type: "GET_LIST_MOVIE_ERROR",
          payload: responseMovies.data.Error,
        });
      } else {
        dispatch({
          type: "GET_LIST_MOVIE_SUCCESS",
          payload: responseMovies.data.Search,
        });
      }
    } catch (error) {
      dispatch({
        type: "GET_LIST_MOVIE_ERROR",
        payload: error.message,
      });
    }
  };
};


export const getDetailMovie = (idImdb) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_START" });
      const responseMovies = await axios.get(
        `${API_URL}?apikey=${API_KEY}&i=${idImdb}&plot=full`
      );

      if (responseMovies.data.Response === "False") {
        dispatch({
          type: "GET_DETAIL_MOVIE_ERROR",
          payload: responseMovies.data.Error,
        });
      } else {
        dispatch({
          type: "GET_DETAIL_MOVIE_SUCCESS",
          payload: responseMovies.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_MOVIE_ERROR",
        payload: error.message,
      });
    }
  };
}