const expect = require('expect');

let TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      let todos = [{
        id: 42,
        text: 'test all files',
        completed: false
      }];

      TodoAPI.setTodos(todos);

      let actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });
    it('should not set invalid todos array', () => {
      let dummyData = {a:'b'};
      TodoAPI.setTodos(dummyData);

      expect(localStorage.getItem('todos')).toBe(null);

    });
  });

  describe('getTodos', () => {
    it('should return an empty array for bad localStorage data', () => {
      let actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
      let todos = [{
        id: 42,
        text: 'test all files',
        completed: false
      }];

      localStorage.setItem('todos', JSON.stringify(todos));

      let actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    let todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
      },
      {
        id: 2,
        text: 'other text here',
        completed: false
      },
      {
        id: 3,
        text: 'some other text here',
        completed: true
      }
    ];

    it('should return all items if show completed is true', () => {
      let filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });
    it('should return incomplete items if show completed is false', () => {
      let filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      let filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should filter todos by searchText', () => {
      let filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(2);
    });

    it('should return all todos if searchText is empty', () => {
      let filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });
  });
});
