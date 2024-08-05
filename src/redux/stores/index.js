import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducers from "../reducers/index";

const middleware = applyMiddleware(thunk, createLogger());

export default configureStore({ reducer: rootReducers }, middleware);
