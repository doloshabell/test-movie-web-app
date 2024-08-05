const initialState = {
  detailMovie: null,
  errorMessage: "",
  isLoading: false,
  isError: false,
  listMovies: null,
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIE_START":
      return { ...state, isLoading: true };
    case "GET_LIST_MOVIE_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoading: false,
        listMovies: action.payload,
      };
    case "GET_DETAIL_MOVIE_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoading: false,
        detailMovie: action.payload,
      };
    case "GET_LIST_MOVIE_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
        isError: true,
        isLoading: false,
        listMovies: null,
      };
    case "GET_DETAIL_MOVIE_ERROR":
      return {
        ...state,
        detailMovie: null,
        errorMessage: action.payload,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
