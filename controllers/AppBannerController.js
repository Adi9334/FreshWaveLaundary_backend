const { sequelize, Sequelize } = require('../config/dbconfig');

// Create main Model
const AppBanner = require('../models/AppBannerModel.js')(sequelize, Sequelize.DataTypes);

// Main work

// 1. Add Address

const addBanner = async (req, res) => {
    try {

        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        let info = {
            app_banner_name:req.body.app_banner_name,
            app_banner_imageURL:"/images/"+file.filename,
            created_by: req.body.created_by,    
            is_active: req.body.is_active
        };
        const newBanner = await AppBanner.create(info);
        res.status(200).send(newBanner);
        console.log(newBanner);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding AppBnner", error: e.message });
    }
};

// 2. Get All Orders

const getAllBanner = async (req, res) => {
    try {
        const getBanner = await AppBanner.findAll({
        });
        res.status(200).send(getBanner);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching AppBanner", error: e.message });
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
const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const file = req.file;
        const updateData = req.body;

        if (file) {
            updateData.app_banner_imageURL = `/images/${file.filename}`;
        }

        const updatedBanner = await AppBanner.update(updateData, { where: { id: id } });
        if (updatedBanner[0] === 1) {
            res.status(200).send({ message: "Banner updated successfully" });
        } else {
            res.status(404).send({ message: "Banner not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Banner", error: e.message });
    }
};



module.exports = {
    addBanner,
    getAllBanner,
    updateBanner
};