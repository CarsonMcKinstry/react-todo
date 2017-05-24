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
    // expect createdAt to be a number
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
  });

  it('should toggle completed value when handleToggle called', () => {
    let dummyTodo = {
      id: 11,
      text: 'test features',
      completed: false,
      createdAt: 0,
      completedAt: undefined
    };
    let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: [dummyTodo]
    });

    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(11);
    expect(todoApp.state.todos[0].completed).toBe(true);
    // expect completed at to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('number');
  });

  // test that when toggle from true to false, completedAt get's removed
  it('should set completedAt to undefined when toggled from true to false', () =>{
    let dummyTodo = {
      id: 42,
      text: 'test features',
      completed: true,
      createdAt: 0,
      completedAt: 1
    };
    let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({
      todos: [dummyTodo]
    });

    expect(todoApp.state.todos[0].completed).toBe(true);
    todoApp.handleToggle(42);
    expect(todoApp.state.todos[0].completed).toBe(false);
    expect(todoApp.state.todos[0].completedAt).toNotExist();
  })
});
