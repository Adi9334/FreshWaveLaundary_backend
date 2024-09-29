const { sequelize, Sequelize } = require('../config/dbconfig');
const RiderWalletTransactions = require('../models/rider_wallet_transactions')(sequelize, Sequelize.DataTypes);

// 1. Add RiderWalletTransaction
const addRiderWalletTransaction = async (req, res) => {
    try {
        const info = {
            wallet_id: req.body.wallet_id,
            transaction_type: req.body.transaction_type,
            amount: req.body.amount,
            description: req.body.description,
            order_id: req.body.order_id,
            created_by: req.body.created_by,
            is_active: req.body.is_active
        };
        const newTransaction = await RiderWalletTransactions.create(info);
        res.status(201).send(newTransaction);
        console.log(newTransaction);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while adding RiderWalletTransaction", error: e.message });
    }
};

// 2. Get All RiderWalletTransactions
const getAllRiderWalletTransactions = async (req, res) => {
    try {
        const transactions = await RiderWalletTransactions.findAll({});
        res.status(200).send(transactions);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderWalletTransactions", error: e.message });
    }
};

// 3. Get One RiderWalletTransaction
const getRiderWalletTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await RiderWalletTransactions.findOne({ where: { id } });
        if (!transaction) {
            return res.status(404).send({ message: "RiderWalletTransaction not found" });
        }
        res.status(200).send(transaction);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while fetching RiderWalletTransaction", error: e.message });
    }
};

// 4. Update RiderWalletTransaction
const updateRiderWalletTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await RiderWalletTransactions.update(req.body, { where: { id } });
        if (updated) {
            const updatedTransaction = await RiderWalletTransactions.findOne({ where: { id } });
            res.status(200).send(updatedTransaction);
        } else {
            res.status(404).send({ message: "RiderWalletTransaction not found or no changes made" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while updating RiderWalletTransaction", error: e.message });
    }
};

// 5. Delete RiderWalletTransaction
const deleteRiderWalletTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await RiderWalletTransactions.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: "RiderWalletTransaction not found" });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: "Error while deleting RiderWalletTransaction", error: e.message });
    }
};

module.exports = {
    addRiderWalletTransaction,
    getAllRiderWalletTransactions,
    getRiderWalletTransactionById,
    updateRiderWalletTransaction,
    deleteRiderWalletTransaction
};