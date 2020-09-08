import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

// redux를 사용하기 위해선 store를 반드시 생성해야 한다. Middleware는 action이 dispatch 되어 reducer에서 처리하기 전에 지정된 작업들을 담는다. (즉, action과 reducer의 중간자 역할)
// ReduxThunk : 특정 작업(함수)을 나중에 실행하고 싶을때, 혹은 몇초 뒤 실행하고 싶을 때 사용한다.
// promiseMiddleware : promise 기반의 비동기 작업을 더 편하게 만들어준다.
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION()
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
