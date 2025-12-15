const { isValidObjectId } = require("mongoose");
const todoModel = require("../../model/todo.model");

const getAllTodos = async (request, response) => {
  try {
    // Pagination parameters
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;

    const skip = (page - 1) * limit;

    const todos = await todoModel.find().limit(limit).skip(skip).select("-__v");
    const totalRecords = await todoModel.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    response.status(200).json({
      status: "success",
      message: "Todos fetched successfully",
      data: todos,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalRecords,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    response.status(500).json({
      status: "failure",
      message: error.message || "Internal Server Error",
    });
  }
};

const getTodoById = async (request, response) => {
  try {
    const todoId = request.params.todo_id;

    if (!isValidObjectId(todoId)) {
      return response.status(400).json({
        status: "failure",
        message: "Invalid Todo ID",
      });
    }

    const todo = await todoModel.findById(todoId).select("-__v");

    if (!todo) {
      return response.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    // Send response
    response.status(200).json({
      status: "success",
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    response.status(500).json({
      status: "failure",
      message: error.message || "Internal Server Error",
    });
  }
};

const addTodo = async (request, response) => {
  try {
    const data = request.body;

    const newTodo = await todoModel.create({
      title: data.title,
      description: data.description,
    });

    response.status(201).json({
      status: "success",
      message: "Todo added successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    response.status(500).json({
      status: "failure",
      message: error.message || "Internal Server Error",
    });
  }
};

const updateTodo = async (request, response) => {
  try {
    const todoId = request.params.todo_id;
    const data = request.body;

    if (!isValidObjectId(todoId)) {
      return response.status(400).json({
        status: "failure",
        message: "Invalid Todo ID",
      });
    }

    const existingTodo = await todoModel.findById(todoId).select("-__v");

    if (!existingTodo) {
      return response.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    await todoModel.findByIdAndUpdate(todoId, {
      title: data.title || existingTodo.title,
      description: data.description || existingTodo.description,
      status: data.status || existingTodo.status,
    });

    response.status(200).json({
      status: "success",
      message: "Todo updated successfully",
      data: existingTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    response.status(500).json({
      status: "failure",
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteTodo = async (request, response) => {
  try {
    const todoId = request.params.todo_id;

    if (!isValidObjectId(todoId)) {
      return response.status(400).json({
        status: "failure",
        message: "Invalid Todo ID",
      });
    }

    const existingTodo = await todoModel.findById(todoId).select("-__v");

    if (!existingTodo) {
      return response.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    await todoModel.findByIdAndDelete(todoId);

    response.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
      data: existingTodo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    response.status(500).json({
      status: "failure",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
