//const db = require('../index.js');

const { sequelize, Sequelize } = require('../config/dbconfig');

// Create main Model
//const OrderItem = db.OrderItem;
const OrderItem = require('../models/order_item_Model.js')(sequelize, Sequelize.DataTypes);


// Main work

// 1. Add OrderItem

const addOrderItem = async (req, res) => {
    try {
        let info = {
            order_id: req.body.order_id,
            order_item_id:req.body.order_item_id,
            order_item_quantity: req.body.order_item_quantity,
            order_item_price: req.body.order_item_price,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newOrderItem = await OrderItem.create(info);
        res.status(200).send(newOrderItem);
        console.log(newOrderItem);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding OrderItem", error: e.message });
    }
};

// 2. Get All OrdersItem
const getAllOrdersItem = async (req, res) => {
    try {
        const OrderItem = await OrderItem.findAll({});
        res.status(200).send(OrderItem);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching OrderItem", error: e.message });
    }
};

// Get One OrderItem

const getOneOrderItem = async (req,res) =>{
    try{
        const {id} = req.params;
        const OrderItem = await OrderItem.findOne({where :{id : id}});
        res.status(200).send(OrderItem);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching OrderItem", error: e.message });
    }
}

// 4. Update OrderItem
const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrderItem = await OrderItem.update(req.body, { where: { id: id } });
        if (updatedOrderItem[0] === 1) {
            res.status(200).send({ message: "OrderItem updated successfully" });
        } else {
            res.status(404).send({ message: "OrderItem not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating OrderItem", error: e.message });
    }
};



module.exports = {
    addOrderItem,
    getAllOrdersItem,
    getOneOrderItem,
    updateOrderItem
};