import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import myReducers from "./context/reducers";

const isServerRunning = true;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = isServerRunning
  ? persistReducer(persistConfig, myReducers)
  : myReducers;

const myStore = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Conditionally create the persistor if the server is running
let persistor;
if (isServerRunning) {
  persistor = persistStore(myStore);

  
  persistor.purge();
}

// Conditionally apply Redux Persist only if the server is running
const AppContainer = isServerRunning ? (
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
) : (
  <Provider store={myStore}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>{AppContainer}</AnimatePresence>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
