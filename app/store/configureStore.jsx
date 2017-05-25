const redux = require('redux');
const {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

export const configure = () => {
  let reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });

  let store = redux.createStore(reducer, redux.compose(
    window.devToolsExension ? window.devToolsExension() : x => x
  ));

  return store;
};
