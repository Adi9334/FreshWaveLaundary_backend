//const serviceitemmaster_Models = require('../models/serviceitemmaster_Models.js');
const { sequelize, Sequelize } = require('../config/dbconfig');


// Create main Model
//const ServiceItem = db.ServiceItem;
const ServiceItem = require('../models/serviceitemmaster_Models.js')(sequelize, Sequelize.DataTypes);

// Main work

// 1. Add item

const addItem = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        

        let info = {
            service_item_name: req.body.service_item_name,
            service_item_imageURL: "/images/"+file.filename,
            service_item_price: req.body.service_item_price,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newItem = await ServiceItem.create(info);
        res.status(200).send(newItem);
        console.log(newItem);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while Adding service Item", error: e.message });
    }
};

// 2. Get All Items
const getAllItem = async (req, res) => {
    try {
        const ServiceItems = await ServiceItem.findAll({});
        res.status(200).send(ServiceItems);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Item", error: e.message });
    }
};

const getOneService = async (req,res) =>{
    try{
        const {id} = req.params;
        const ServiceItem = await ServiceItem.findOne({where :{id : id}});
        res.status(200).send(ServiceItem);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching Service", error: e.message });
    }
}

// 4. Update ServiceItem
const updateService = async (req, res) => {
    try {
        const { id } = req.params;

        const file = req.file;
        const updateData = req.body;

        if (file) {
            updateData.service_item_imageURL = `/images/${file.filename}`;
        }

        const updatedService = await ServiceItem.update(updateData, { where: { id: id } });

        if (updatedService[0] === 1) {
            res.status(200).send({ message: "ServiceItem updated successfully" });
        } else {
            res.status(404).send({ message: "ServiceItem not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating ServiceItem", error: e.message });
    }
};

module.exports = {
    addItem,
    getAllItem,
    getOneService,
    updateService
};