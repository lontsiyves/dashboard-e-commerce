import {
  combineReducers,
  configureStore,
 // applyMiddleware,
} from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import {UserReducer}  from "./UserReducer"
//import logger from "redux-logger";
//import { thunk } from "redux-thunk";

const rootreducer = combineReducers({ products: Reducer, users:UserReducer });
const Store = configureStore({
  reducer: rootreducer,
});

export default Store;
