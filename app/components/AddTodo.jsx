const React = require('react');

const AddTodo = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();


    let todoText = this.refs.todoText.value;
    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="What do you need to do?" ref="todoText"/>
          <button type="submit" className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;
