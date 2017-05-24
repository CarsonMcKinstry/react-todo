const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

const Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should call onToggle prop with id on click', () => {
    let dummyTodo = {
      id: 199,
      text: 'Write todo.test.jsx text',
      completed: true
    };

    let spy = expect.createSpy();
    let todo = TestUtils.renderIntoDocument(<Todo {...dummyTodo} onToggle={spy}/>);
    let $el = $(ReactDOM.findDOMNode(todo));

    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(199);

  });
});
