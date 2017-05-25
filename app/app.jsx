const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

const TodoApp = require('TodoApp');

const actions = require('actions');
const store = require('configureStore').configure();

let unsubscribe = store.subscribe( () => {
  console.log('New state', store.getState());
});

store.dispatch(actions.addTodo('clean the yard'));
store.dispatch(actions.setSearchText('clean'));
store.dispatch(actions.toggleShowCompleted());

// load foundation
$(document).foundation();

// load custom css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.querySelector('#app')
);
