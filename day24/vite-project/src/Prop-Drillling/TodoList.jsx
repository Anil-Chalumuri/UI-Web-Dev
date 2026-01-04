import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, addTodo }) => {
  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <button onClick={() => addTodo(`New Todo - ${new Date().getTime()}`)}>
          Add Todo
        </button>
      </div>
      <div>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
