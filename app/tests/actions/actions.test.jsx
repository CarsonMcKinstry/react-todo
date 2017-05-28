const expect = require('expect');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import firebase, {firebaseRef} from 'app/firebase';
const actions = require('actions');

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    let action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'some search text'
    };
    let res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    let action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'anything we like',
        completed: false,
        createdAt: 1234567
      }
    };
    let res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });



  it('should generate toggle show completed action', () => {
    let action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    let res = actions.toggleShowCompleted(action);

    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    let action = {
      type: 'UPDATE_TODO',
      id: 1,
      updates: {completed: false}
    };
    let res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate add todos action', () => {
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
    }
    let res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it('should generate login action', () => {
    let uid = '12345';
    let action = {
      type: 'LOGIN',
      uid
    };
    let res = actions.login(uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action', () => {
    let action = {
      type: 'LOGOUT'
    };
    let res = actions.logout();

    expect(res).toEqual(action);
  })

  describe('Tests with firebase todos', () => {
    let testTodoRef;
    let uid;
    let todosRef;

    beforeEach((done) => {
      firebase.auth().signInAnonymously().then(
        (user) => {
          uid = user.uid;
          todosRef = firebaseRef.child(`users/${uid}/todos`);

          return todosRef.remove();
        }
      ).then(() => {
        testTodoRef = todosRef.push();
        return testTodoRef.set({
          text: 'something to do',
          completed: false,
          createAt: 12341251
        });
      }).then(() => done())
      .catch(done);

    });

    afterEach((done) => {
      todosRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);
      store.dispatch(action).then(()=>{
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key,
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();
        done();
      }, done);
    });

    it('should populate todos and dispatch ADD_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();
      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('something to do');
        done();
      }, done);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'My todo item';

      store.dispatch(actions.startAddTodo(todoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();
      }).catch(done);
    });

  });


});
