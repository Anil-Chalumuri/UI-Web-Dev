import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Parent from "./Prop-Drillling/Parent.jsx";
import { TodoProvider } from "./Context-API/TodoProvider.jsx";
import TodoConsumer from "./Context-API/TodoConsumer.jsx";

createRoot(document.getElementById("root")).render(
  <TodoProvider>
    <TodoConsumer />
  </TodoProvider>
);
