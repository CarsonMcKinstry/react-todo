const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

import * as actions from 'actions';
import {Todo} from 'Todo';

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should dispatch UPDATE_TODO action on click', () => {
    let dummyTodo = {
      id: 199,
      text: 'Write todo.test.jsx text',
      completed: true
    };
    let action = actions.startToggleTodo(dummyTodo.id, !dummyTodo.completed);
    let spy = expect.createSpy();
    let todo = TestUtils.renderIntoDocument(<Todo {...dummyTodo} dispatch={spy}/>);
    let $el = $(ReactDOM.findDOMNode(todo));

    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(action);

  });
});
