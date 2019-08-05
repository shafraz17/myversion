// import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// this code is running in the correct way and it makes some new problems

// import { createStore } from "redux";

// function todos(state = [], action) {
//   switch (action.type) {
//     case "ADD_TODO":
//       return state.concat([action.text]);
//     default:
//       return state;
//   }
// }

// const store = createStore(todos, ["Use Redux"]);

// store.dispatch({
//   type: "ADD_TODO",
//   text: "Read the docs"
// });

// console.log(store.getState());
// // [ 'Use Redux', 'Read the docs' ]

// export default store;

//this code is from tthe udemy BY DS
// const redux = require("redux");
// const createStore = redux.createStore;

// //initialiser
// const initialState = {
//   counter: 0
// };

// // reducer
// const rootReducer = (state, action) => {
//   return state;
// };

// // store

// const store = createStore(rootReducer);
// console.log(store.getState());

// export default store;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
