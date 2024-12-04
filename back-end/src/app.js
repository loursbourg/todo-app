const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoController = require("./controllers/todo-controller");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware
 *
 */
app.use(bodyParser.json());
app.use(cors());

/**
 * MongoDB Connection
 *
 */
mongoose
  .connect(
    "mongodb+srv://19281459495115214763:ZkO4clmKesS8ABwD@todos.0napx.mongodb.net/?retryWrites=true&w=majority&appName=todos",
    {}
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/**
 * Routes
 *
 */
app.post("/todos", todoController.store);
app.get("/todos", todoController.index);
app.put("/todos/:id/toggle", todoController.toggleStatus);
app.put("/todos/:id", todoController.update);
app.delete("/todos/:id", todoController.destroy);

/**
 * Start the server
 *
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
