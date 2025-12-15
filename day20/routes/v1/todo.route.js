const express = require("express");
const logMiddleware = require("../../middleware/logger.middleware");
const {
  getAllTodos,
  addTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} = require("../../controller/v1/todo.controller");
const { query, body } = require("express-validator");
const router = express.Router();

router.get(
  "/",
  logMiddleware,
  query("page").notEmpty(),
  query("limit").notEmpty(),
  getAllTodos
);

router.get("/:todo_id", logMiddleware, getTodoById);

router.post(
  "/",
  logMiddleware,
  body("title").notEmpty(),
  body("description").notEmpty(),
  addTodo
);

router.put("/:todo_id", logMiddleware, updateTodo);

router.delete("/:todo_id", logMiddleware, deleteTodo);

module.exports = router;
