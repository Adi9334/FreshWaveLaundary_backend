//const db = require('../index.js');

const { sequelize, Sequelize } = require('../config/dbconfig');

// Create main Model
//const FQA = db.FQA;
const FQA = require('../models/FQAModel.js')(sequelize,Sequelize.DataTypes);


// Main work

// 1. Create User
const addfqa = async (req, res) => {
    try {
        let info = {
            faq_question: req.body.faq_question,
            faq_answer: req.body.faq_answer,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };

        const newfqa = await FQA.create(info);
        res.status(200).send(newfqa);
        console.log(newfqa);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding new FQA", error: e.message });
    }
};

// 2. Get All Users
const getAllfqa = async (req, res) => {
    try {
        let fqa = await FQA.findAll({});
        res.status(200).send(fqa);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching FQA", error: e.message });
    }
};

// 3. Get One User
// const getOneUser = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let users = await Users.findOne({
//             where: { id: id }
//         });
//         res.status(200).send(users);
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).send({ message: "Error while fetching user", error: e.message });
//     }
// };

// 4. Update User
const updatefqa = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedfqa = await FQA.update(req.body, { where: { id: id } });
        if (updatedfqa[0] === 1) {
            res.status(200).send({ message: "FQA updated successfully "});
        } else {
            res.status(404).send({ message: "FQA not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating FQA", error: e.message });
    }
};

// 5. Delete User
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Users.destroy({ where: { id: id } });
//         res.status(200).send("User deleted successfully");
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).send({ message: "Error while deleting user", error: e.message });
//     }
// };

module.exports = {
    addfqa,
    getAllfqa,
    updatefqa,
};
