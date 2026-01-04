import React from "react";
import TodoList from "./TodoList";

const TodoContainer = ({ todos, addTodo }) => {
  return <TodoList todos={todos} addTodo={addTodo} />;
};

export default TodoContainer;
