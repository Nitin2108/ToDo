const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Categories
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a category
    const category = {
        title: req.body.title,
        user:req.user
    };

    // Save category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });


};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  //  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
console.log("user is"+req.user);
    Category.findAll({ where: {user:req.user} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Categories."
            });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findOne({where:{user:req.user,id:id}})
        .then(data => {
            if (data === null) {
                res.status(404).send('Not found!');
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id,user:req.user }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};


// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id,user:req.user }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {user:req.user},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Category were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Category."
          });
        });
};

