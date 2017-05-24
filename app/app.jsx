const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

const TodoApp = require('TodoApp');

// load foundation
$(document).foundation();

// load custom css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.querySelector('#app')
);
