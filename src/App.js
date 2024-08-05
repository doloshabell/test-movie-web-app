import { Provider } from "react-redux";
import stores from "./redux/stores";

import "./App.css";
import ListMovies from "./pages/ListMovies";

function App() {
  return (
    <Provider store={stores}>
      <ListMovies />
    </Provider>
  );
}

export default App;
