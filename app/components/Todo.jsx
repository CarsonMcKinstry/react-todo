const React = require('react');
const moment = require('moment');
const {connect} = require('react-redux');
const actions = require('actions');

export const Todo = React.createClass({

  render: function () {
    let {id, text, completed, createdAt, completedAt, dispatch} = this.props;

    let todoClassName = completed ? "todo todo-completed":"todo";

    function renderDate() {
      let message = "Created ";
      let timestamp = createdAt;
      let format = 'MMM Do, YYYY @ h:mm a';

      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return `${message} ${moment.unix(timestamp).format(format)}`;
    }

    return (
      <div className={todoClassName} onClick={ () => {
        dispatch(actions.toggleTodo(id));
      }}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
});

export default connect()(Todo);
