import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import storage from "redux-persist/lib/storage"; //로컬에 저장시
import storageSession from "redux-persist/lib/storage/session"; //세션에 저장시
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: userReducer,
});

// 
const rootReducer = (state, action) => {
  if (action.type === "logout") {
    localStorage.removeItem("persist:root");
    return reducers(undefined, action);
  }
  if (action.type === "login") {
    console.log("로그인");
  }
  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // 포함해야 될 목록. name인지 initalState 값인지 모르겠음
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default Store;
