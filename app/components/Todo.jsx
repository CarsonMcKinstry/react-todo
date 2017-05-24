const React = require('react');
const moment = require('moment');

const Todo = React.createClass({

  render: function () {
    let {id, text, completed, createdAt, completedAt} = this.props;

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
      <div onClick={ () => {
        this.props.onToggle(id);
      }}>
        <input type="checkbox" checked={completed}/>
        <p>{text}</p>
        <p>{renderDate()}</p>
      </div>
    );
  }
});

module.exports = Todo;
