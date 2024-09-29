
const { sequelize, Sequelize } = require('../config/dbconfig');

//const Orders_Models = require('../models/orders_Model.js');
const {getOrderDetailsService, getallOrderDetailsService,getAssignedOrderDetailsService} = require('../services/Orders.js')


// Create main Model
//const Orders = db.Orders;
const Orders = require('../models/orders_Model.js')(sequelize, Sequelize.DataTypes);


// Main work

// 1. Add Order

const addOrder = async (req, res) => {
    try {
        let info = {
            user_id: req.body.user_id,
            service_id: req.body.service_id,
            order_item_quantity: req.body.order_item_quantity,
            order_item_price: req.body.order_item_price,
            order_tax: req.body.order_tax,
            order_mrp: req.body.order_mrp,
            order_total_afterdis : req.body.order_total_afterdis,
            order_discount: req.body.order_discount,
            order_promocode: req.body.order_promocode,
            order_delivery_charges: req.body.order_delivery_charges,
            order_handling_charges: req.body.order_handling_charges,
            order_total_price: req.body.order_total_price,
            order_address_id: req.body.order_address_id,
            order_payment_mode: req.body.order_payment_mode,
            order_status: req.body.order_status,
            order_delivered_at: req.body.order_delivered_at,
            order_delivery_type: req.body.order_delivery_type,
            order_delivery_slot: req.body.order_delivery_slot,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newOrder = await Orders.create(info);
        res.status(200).send(newOrder);
        console.log(newOrder);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding Order", error: e.message });
    }
};

// 2. Get All Orders
const getAllOrders = async (req, res) => {
    try {
       const data  = await getallOrderDetailsService();
        console.log("Received Data:", data);
       if(!data){
        return res.status(404).send({message:'Order Details Not Found'})
       }
       return res.status(200).send({data:data,message:"Order details fetch successfully"});
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Order", error: e.message });
    }
};

const getOrderDetails = async (req,res) =>{
    try{
    const {id} = req.params;
       const data  = await getOrderDetailsService(id);
       console.log("Received Data:", data);
       if(!data){
        return res.status(404).send({message:'Order Details Not Found'})
       }
       return res.status(200).send({data:data,message:"Order details fetch successfully"});
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Order", error: e.message });
    }
}

const getAllAssignedOrders = async (req, res) => {
    try {
        const {id} = req.params;
        const data  = await getAssignedOrderDetailsService(id);
        console.log("Received Data:", data);
       if(!data){
        return res.status(404).send({message:'Order Details Not Found'})
       }
       return res.status(200).send({data:data,message:"Order details fetch successfully"});
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Order", error: e.message });
    }
};



// 4. Update Order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Orders.update(req.body, { where: { id: id } });
        if (updatedOrder[0] === 1) {
            res.status(200).send({ message: "Order updated successfully" });
        } else {
            res.status(404).send({ message: "Order not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Order", error: e.message });
    }
};



module.exports = {
    addOrder,
    getAllOrders,
    getOrderDetails,
    getAllAssignedOrders,
    updateOrder
};