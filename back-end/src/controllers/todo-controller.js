const Todo = require("../models/todo");
const { TodoResource } = require("../resources/todo");

/**
 * Store a new Todo
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const store = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await Todo.create({ title });
    return res.status(201).json(new TodoResource(newTodo));
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * List all Todos
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const index = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos.map((todo) => new TodoResource(todo)));
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update a Todo
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update a Todo completed status
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(new TodoResource(updatedTodo));
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a Todo
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
  toggleStatus,
};
