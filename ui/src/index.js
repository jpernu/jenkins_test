/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

import noteReducer from "./reducers/noteReducer";
const store = createStore(noteReducer);




// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
