const { sequelize, Sequelize } = require('../config/dbconfig');
const bcrypt = require('bcrypt');


// Create main Model
const RiderUser = require('../models/riderUser_Model.js')(sequelize, Sequelize.DataTypes);

// Main work
const login = async (req, res) => {
    console.log('login working');
    
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await RiderUser.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// 1. Create RiderUser
const addRiderUser = async (req, res) => {
    try {
        let info = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            created_by: 'user',
            is_active: true
        };

        const newRiderUser = await RiderUser.create(info);
        res.status(200).send(newRiderUser);
        console.log(newRiderUser);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while creating RiderUser", error: e.message });
    }
};

// 2. Get All RiderUsers
const getAllRiderUsers = async (req, res) => {
    try {
        let riderUsers = await RiderUser.findAll({});
        res.status(200).send(riderUsers);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderUsers", error: e.message });
    }
};

// 3. Get One RiderUser
const getOneRiderUser = async (req, res) => {
    try {
        let id = req.params.id;
        let riderUser = await RiderUser.findOne({
            where: { id: id }
        });
        res.status(200).send(riderUser);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderUser", error: e.message });
    }
};

// 4. Update RiderUser
const updateRiderUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRiderUser = await RiderUser.update(req.body, { where: { id: id } });
        if (updatedRiderUser[0] === 1) {
            res.status(200).send({ message: "RiderUser updated successfully "});
        } else {
            res.status(404).send({ message: "RiderUser not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating RiderUser", error: e.message });
    }
};

// 5. Delete RiderUser
const deleteRiderUser = async (req, res) => {
    try {
        const { id } = req.params;
        await RiderUser.destroy({ where: { id: id } });
        res.status(200).send("RiderUser deleted successfully");
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while deleting RiderUser", error: e.message });
    }
};

//6. Reset Password
const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: 'All password fields are required' });
    }

    try {
        const user = await RiderUser.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password matches (plain text comparison)
        if (currentPassword !== user.password) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        await RiderUser.update({ password: newPassword }, { where: { id } });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error while resetting password', error: error.message });
    }
};




module.exports = {
    addRiderUser,
    getAllRiderUsers,
    getOneRiderUser,
    updateRiderUser,
    deleteRiderUser,
    login,
    resetPassword
};
