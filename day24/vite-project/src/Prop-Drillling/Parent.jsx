import React, { useState } from "react";
import TodoContainer from "./TodoContainer";

const Parent = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  return <TodoContainer todos={todos} addTodo={addTodo} />;
};

export default Parent;
