const db = require("../models");
const Category = db.categories;
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.categoryId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Task
    const task = {
        name: req.body.name,
        status: req.body.status ? req.body.status : 'Pending',
        categoryId: req.body.categoryId
    };
    try {
        // Save Task in the database
        let data = await Task.create(task)

        res.send(data);

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the tasks."
        });
    }



};

// Retrieve all Tasks from the database.
exports.findAll = async (req, res) => {
    try {
        let categorywithtasks = await Category.findAll({
            where: {
                user: req.user
            },
            include: ["tasks"]
        })
        await res.send(categorywithtasks);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching details"
        });
    }
}
// Find a single task with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let taskDetails = await Task.findOne({ where: { id: id } });
        if (!taskDetails)
            return res.status(404).send("not found");
        let categoryId = taskDetails.categoryId;
        let details = await Category.findOne({ where: { id: categoryId } });
        if (details.user != req.user)
            return res.status(401).send("Not authorised");

        console.log(categoryId);
        let data = await Task.findOne({ where: { id: id, categoryId: categoryId } });

        if (data === null) {
            res.status(404).send('Not found!');
        }
        await res.send(data);

    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Task with id=" + id

        });
    }
};

// Update a task by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        let taskDetails = await Task.findOne({ where: { id: id } });
        if (!taskDetails)
            return res.status(404).send("not found");
        let categoryId = taskDetails.categoryId;
        let details = await Category.findOne({ where: { id: categoryId } });
        if (details.user != req.user)
            return res.status(401).send("Not authorised");

        let num = await Task.update(req.body, {
            where: { id: id }
        })

        if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Category with id=" + id
        });
    }
};

// Delete a Task  with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        let taskDetails = await Task.findOne({ where: { id: id } });
        if (!taskDetails)
            return res.status(404).send("not found");
        let categoryId = taskDetails.categoryId;
        let details = await Category.findOne({ where: { id: categoryId } });
        if (details.user != req.user)
            return res.status(401).send("Not authorised");

        let num = await Task.destroy({
            where: { id: id }
        })

        if (num == 1) {
            res.send({
                message: "Task was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
            });
        }

    } catch (err) {
        res.status(500).send({
            message: "Could not delete Task with id=" + id
        });
    }
};
//delete a task by category
exports.deleteTasksByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {

        let num = await Category.destroy({
            where: { id: categoryId, user: req.user }
        })
        if (num == 1) {
            res.send({
                message: "Tasks were deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Task with categoryId=${categoryId}. Maybe Category was not found!`
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Could not delete Task with id=" + categoryId
        });
    }
};


