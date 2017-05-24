const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

const TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should add todo to the todos state on handleAddTodo', () => {
    let todoText = "test text";
    let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({ todos: []});
    todoApp.handleAddTodo(todoText);
    expect(todoApp.state.todos[0].text).toBe(todoText);
  });

  it('should toggle completed value when handleToggle called', () => {
    let dummyTodo = {
      id: 11,
      text: 'test features',
      completed: false
    };
    let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: [dummyTodo]
    });

    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(11);
    expect(todoApp.state.todos[0].completed).toBe(true);
  });
});
