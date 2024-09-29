const { sequelize, Sequelize } = require('../config/dbconfig');

const { getAddressDetailsService } = require('../services/Address.js');


// Create main Model
const Address = require('../models/address_Model.js')(sequelize, Sequelize.DataTypes);

// Main work

// 1. Add Address

const addAddress = async (req, res) => {
    try {
        let info = {
            user_id: req.body.user_id,
            full_name:req.body.full_name,
            phone_number:req.body.phone_number,
            pincode:req.body.pincode,
            state:req.body.state,
            city:req.body.city,
            street:req.body.street,
            area:req.body.area,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newAddress = await Address.create(info);
        res.status(200).send(newAddress);
        console.log(newAddress);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding Address", error: e.message });
    }
};

// 2. Get All Orders
const getAllAddress = async (req, res) => {
    try {
        const newAddress = await Address.findAll({});
        res.status(200).send(newAddress);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Address", error: e.message });
    }
};

const getOneAddress = async (req, res) => {
    const {id} = req.params;
    try {
        const newAddress = await Address.findOne({
            where: { id: id }
        });
        res.status(200).send(newAddress);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Address", error: e.message });
    }
};

const getAddressDetails = async (req,res) =>{
    try{
    const {user_id} = req.params;
       const data  = await getAddressDetailsService(user_id);
       console.log("Received Data:", data);
       if(!data){
        return res.status(404).send({message:'Address Not Found'})
       }
       return res.status(200).send({data:data,message:"Address details fetch successfully"});
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Address", error: e.message });
    }
}

// 4. Update Order
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAddress = await Address.update(req.body, { where: { id: id } });
        if (updatedAddress[0] === 1) {
            res.status(200).send({ message: "Address updated successfully" });
        } else {
            res.status(404).send({ message: "Address not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Addressr", error: e.message });
    }
};



module.exports = {
    addAddress,
    getAllAddress,
    getOneAddress,
    getAddressDetails,
    updateAddress
};