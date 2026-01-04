import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "./TodoProvider";

const TodoList = () => {
  const { todos, addTodo } = useTodos();

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
