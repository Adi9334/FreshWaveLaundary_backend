//const db = require('../index.js');
const { sequelize, Sequelize } = require('../config/dbconfig');


// Create main Model
const Service = require('../models/servicemaster_Model.js')(sequelize, Sequelize.DataTypes);

// Main work

// 1. Add item

const addService = async (req, res) => {
    try {

        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        
        
        let info = {
            service_name: req.body.service_name,
            service_description: req.body.service_description,
            service_price: req.body.service_price,
            imageURL : "/images/"+file.filename,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };

        const newService = await Service.create(info);
        res.status(200).send(newService);
        console.log(newService);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while creating user", error: e.message });
    }
};

// 2. Get All Items
const getAllService = async (req, res) => {
    try {
        let Services = await Service.findAll();
        console.log(Services);
        res.status(200).send(Services);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching users", error: e.message });
    }
};

const getOneService = async (req,res) =>{
    try{
        const {id} = req.params;
        const Service = await Service.findOne({where :{id : id}});
        res.status(200).send(Service);
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
            updateData.service_imageURL = `/images/${file.filename}`;
        }

        const updatedService = await Service.update(updateData, { where: { id: id } });

        if (updatedService[0] === 1) {
            res.status(200).send({ message: "Service updated successfully" });
        } else {
            res.status(404).send({ message: "Service not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating Service", error: e.message });
    }
};


module.exports = {
    addService,
    getAllService,
    getOneService,
    updateService
};