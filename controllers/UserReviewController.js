
//const db = require('../index.js');

const { sequelize, Sequelize } = require('../config/dbconfig');

// Create main Model
//const UserReview = db.UserReview;
const UserReview = require('../models/UserReiviewModel.js')(sequelize,Sequelize.DataTypes);


// Main work

// 1. Create User
const addreview = async (req, res) => {
    try {
        let info = {
            user_id: req.body.user_id,
            user_name:req.body.user_name,
            user_phonenumber:req.body.user_phonenumber,
            user_rating:req.body.user_rating,
            user_review:req.body.user_review,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };

        const newreview = await UserReview.create(info);
        res.status(200).send(newreview);
        console.log(newreview);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding new review", error: e.message });
    }
};

// 2. Get All Users
const getAllreview = async (req, res) => {
    try {
        let userreview = await UserReview.findAll({});
        res.status(200).send(userreview);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching userreviews", error: e.message });
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
const updatereview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedreview = await UserReview.update(req.body, { where: { id: id } });
        if (updatedreview[0] === 1) {
            res.status(200).send({ message: "Review updated successfully "});
        } else {
            res.status(404).send({ message: "Review not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Review", error: e.message });
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
    addreview,
    getAllreview,
    updatereview,
};
