const { sequelize, Sequelize } = require('../config/dbconfig');

// Create main Model
const Pincode = require('../models/PincodeModel.js')(sequelize, Sequelize.DataTypes);

// Main work

// 1. Add Address

const addPincode = async (req, res) => {
    try {
        let info = {
            pincode:req.body.pincode,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newPincode = await Pincode.create(info);
        res.status(200).send(newPincode);
        console.log(newPincode);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding Pincode", error: e.message });
    }
};

// 2. Get All Orders
const getAllPincode = async (req, res) => {
    try {
        const getPincode = await Pincode.findAll({});
        res.status(200).send(getPincode);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Pincode", error: e.message });
    }
};

// const getAddressDetails = async (req,res) =>{
//     try{
//     const {user_id} = req.params;
//        const data  = await getAddressDetailsService(user_id);
//        console.log("Received Data:", data);
//        if(!data){
//         return res.status(404).send({message:'Address Not Found'})
//        }
//        return res.status(200).send({data:data,message:"Address details fetch successfully"});
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).send({ message: "Error while fetching Address", error: e.message });
//     }
// }

// 4. Update Order
const updatePincode = async (req, res) => {
    try {
        const { id } = req.params;
        const updatePincode = await Pincode.update(req.body, { where: { id: id } });
        if (updatedPincode[0] === 1) {
            res.status(200).send({ message: "Pincode updated successfully" });
        } else {
            res.status(404).send({ message: "Pincode not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Pincode", error: e.message });
    }
};



module.exports = {
    addPincode,
    getAllPincode,
    updatePincode
};