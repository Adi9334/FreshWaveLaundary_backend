const { sequelize, Sequelize } = require('../config/dbconfig');
const RiderWallet = require('../models/rider_wallet')(sequelize, Sequelize.DataTypes);




// 1. Add RiderWallet
const addRiderWallet = async (req, res) => {
    try {
        const info = {
            rider_id: req.body.rider_id,
            total_balance: req.body.total_balance,
            current_balance: req.body.current_balance,
            coins: req.body.coins,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newRiderWallet = await RiderWallet.create(info);
        res.status(201).send(newRiderWallet);
        console.log(newRiderWallet);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while adding RiderWallet", error: e.message });
    }
};

// 2. Get All RiderWallets
const getAllRiderWallets = async (req, res) => {
    try {
        const riderWallets = await RiderWallet.findAll({});
        res.status(200).send(riderWallets);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderWallets", error: e.message });
    }
};

// 3. Get One RiderWallet
const getRiderWalletById = async (req, res) => {
    try {
        const { id } = req.params;
        const riderWallet = await RiderWallet.findOne({ where: { id } });
        if (!riderWallet) {
            return res.status(404).send({ message: "RiderWallet not found" });
        }
        res.status(200).send(riderWallet);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderWallet", error: e.message });
    }
};

// 4. Update RiderWallet
const updateRiderWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await RiderWallet.update(req.body, { where: { id } });
        if (updated) {
            const updatedRiderWallet = await RiderWallet.findOne({ where: { id } });
            res.status(200).send(updatedRiderWallet);
        } else {
            res.status(404).send({ message: "RiderWallet not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating RiderWallet", error: e.message });
    }
};

// 5. Delete RiderWallet
const deleteRiderWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await RiderWallet.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "RiderWallet not found" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while deleting RiderWallet", error: e.message });
    }
};

module.exports = {
    addRiderWallet,
    getAllRiderWallets,
    getRiderWalletById,
    updateRiderWallet,
    deleteRiderWallet
};
