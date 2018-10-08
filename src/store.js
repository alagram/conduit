import { applyMiddleware, createStore, combineReducers } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import auth from "./reducers/auth";
import common from "./reducers/common";
import home from "./reducers/home";
import profile from "./reducers/profile";
import settings from "./reducers/settings";
import article from "./reducers/article";
import articleList from "./reducers/articleList";
import editor from "./reducers/editor";

import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  return applyMiddleware(
    myRouterMiddleware,
    promiseMiddleware,
    localStorageMiddleware
  );
};

const reducer = combineReducers({
  article,
  articleList,
  auth,
  common,
  home,
  profile,
  settings,
  editor
});

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
