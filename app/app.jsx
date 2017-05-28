const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
import Login from 'Login';

const actions = require('actions');
const store = require('configureStore').configure();
const TodoAPI = require('TodoAPI');

store.dispatch(actions.startAddTodos());

// load foundation
$(document).foundation();

// load custom css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
);
