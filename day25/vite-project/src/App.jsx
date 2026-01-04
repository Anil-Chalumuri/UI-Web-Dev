import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, fetchTodos, removeTodo } from "./features/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);

  const handleAddTodo = () => {
    const userInput = prompt("Enter a new todo:");

    if (!userInput) {
      alert("Todo cannot be empty!");
    } else {
      const newTodo = {
        text: userInput,
        id: Date.now().toString(),
      };
      dispatch(addTodo(newTodo));
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <Fragment>
      <div>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        {todos.length === 0 ? (
          <p>No Todos Available</p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <div key={index}>
                <li key={index}>{todo?.text}</li>
                <button onClick={() => handleRemoveTodo(todo?.id)}>
                  Remove
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default App;
