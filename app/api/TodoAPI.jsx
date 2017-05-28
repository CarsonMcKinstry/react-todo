const $ = require('jquery');

module.exports = {
  filterTodos: function (todos, showCompleted, searchText) {
    let filteredTodos = todos;

    // filter by showCompleted
    filteredTodos = filteredTodos.filter((item)=>{
      return !item.completed || showCompleted;
    });
    // filter by searchText
    filteredTodos = filteredTodos.filter((item) => {
      let text = item.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });
    // sort by non-completed first
    filteredTodos.sort((a,b) =>{
      if (a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed){
        return 1;
      } else {
        return 0;
      }
    })
    return filteredTodos;
  }
};
