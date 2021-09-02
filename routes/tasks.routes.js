module.exports = app => {
  const tasks = require("../controllers/tasks.controller");
  const { verify } = require("../middlewares/verifyToken");
  var router = require("express").Router();

  // Create a new Task
  router.post("/", tasks.create);

  // Retrieve all Tasks
  router.get("/", tasks.findAll);

  // Retrieve a single Task with id
  router.get("/:id", tasks.findOne);

  // Update a Task with id
  router.put("/:id", tasks.update);

  // Delete a Task with id
  router.delete("/:id", tasks.delete);

  // Delete a Task by category
  router.delete("/deleteByCategory/:categoryId", tasks.deleteTasksByCategory);

  app.use('/api/tasks', verify, router);
};