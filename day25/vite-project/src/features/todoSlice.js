import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Intiail State
const todoInitialState = {
  todos: [],
  loading: false,
  error: null,
};

// Async Thunk Action Creators
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const data = await response.json();
  return data.map((todo) => ({ id: todo.id.toString(), text: todo.title }));
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    addTodo: (state, action) => {
      const { type, payload } = action;
      console.log("addTodo: ", type, payload);
      state.todos.push(payload);

      /**
       *
       * Ye dono line bahut jada ho gayi hai
       *
       */
      //   todoInitialState.todos.push(payload);
      //   state.todos = todoInitialState.todos;
    },
    removeTodo: (state, action) => {
      const { type, payload } = action;
      console.log("removeTodo: ", type, payload);
      state.todos = state.todos.filter((todo) => todo?.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch todos";
      });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
