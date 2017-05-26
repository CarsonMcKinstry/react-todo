const expect = require('expect');
const df = require('deep-freeze-strict');

const reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () =>{
    it('should set searchText', () => {
      let action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'some search text'
      };
      let res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      let action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      let res = reducers.showCompletedReducer(df(false),df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      let action = {
        type: 'ADD_TODO',
        text: 'walk the dog'
      };
      let res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });

    it('should toggle todo', () => {
      let todos = [
        {
          id: '123',
          text: 'something',
          completed: true,
          createdAt: 123,
          completedAt: 125
        }
      ]
      let action = {
        type: 'TOGGLE_TODO',
        id: '123'
      }
      let res = reducers.todosReducer(df(todos), df(action));
      expect(res.length).toEqual(1);
      expect(res[0].completed).toEqual(false);
      expect(res[0].completedAt).toNotExist();
    });

    it('should add existing todos', () => {
      let todos = [{
        id: 111,
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }];
      let action = {
        type: 'ADD_TODOS',
        todos
      };
      let res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
