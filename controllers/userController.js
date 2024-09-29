const { sequelize, Sequelize } = require('../config/dbconfig');
const Users = require('../models/userModel.js')(sequelize, Sequelize.DataTypes);


// 1. Create User
const addUsers = async (req, res) => {
    try {
        let info = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };

        const newUser = await Users.create(info);
        res.status(200).send(newUser);
        console.log(newUser);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while creating user", error: e.message });
    }
};

// 2. Get All Users
const getAllUsers = async (req, res) => {
    try {
        let users = await Users.findAll({});
        res.status(200).send(users);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching users", error: e.message });
    }
};

// 3. Get One User
const getOneUser = async (req, res) => {
    try {
        let id = req.params.id;
        let users = await Users.findOne({
            where: { id: id }
        });
        res.status(200).send(users);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching user", error: e.message });
    }
};

// 4. Update User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await Users.update(req.body, { where: { id: id } });
        if (updatedUser[0] === 1) {
            res.status(200).send({ message: "User updated successfully "});
        } else {
            res.status(404).send({ message: "User not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating user", error: e.message });
    }
};

// 5. Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.destroy({ where: { id: id } });
        res.status(200).send("User deleted successfully");
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while deleting user", error: e.message });
    }
};

module.exports = {
    addUsers,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};
