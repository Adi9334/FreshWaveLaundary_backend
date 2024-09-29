//const db = require('../index.js');
const { sequelize, Sequelize } = require('../config/dbconfig');


// Create main Model
//const Coupon = db.Coupon;
const Coupon = require('../models/CouponModel')(sequelize,Sequelize.DataTypes);


// Main work

// 1. Create User
const addCoupon = async (req, res) => {
    try {

        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        let info = {
            coupon_discount_type:req.body.coupon_discount_type,
            coupon_discount: req.body.coupon_discount,
            coupon_order_type:req.body.coupon_order_type,
            coupon_minium_order:req.body.coupon_minium_order,
            coupon_code:req.body.coupon_code,
            coupon_expiry_date:req.body.coupon_expiry_date,
            coupon_imageURL:"/images/"+file.filename,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };

        const newCoupon = await Coupon.create(info);
        res.status(200).send(newCoupon);
        console.log(newCoupon);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding new Coupon", error: e.message });
    }
};

// 2. Get All Users
const getAllCoupon = async (req, res) => {
    try {
        let getCoupon = await Coupon.findAll({});
        res.status(200).send(getCoupon);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Coupons", error: e.message });
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
const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const file = req.file;
        const updateData = req.body;

        if (file) {
            updateData.coupon_imageURL = `/images/${file.filename}`;
        }

        const updatedCoupon = await Coupon.update(updateData, { where: { id: id } });
        if (updatedCoupon[0] === 1) {
            res.status(200).send({ message: "Coupon updated successfully "});
        } else {
            res.status(404).send({ message: "Coupon not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Coupon", error: e.message });
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
    addCoupon,
    getAllCoupon,
    updateCoupon,
};
