<<<<<<< HEAD
const db = require('../models');
=======
const db = require('../models')
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c

const InventoryDB = db.inventoryDet;
const { getNextSerialNumber } = require('./SerialNumber.controller');

<<<<<<< HEAD
// Common error handler
const handleError = (res, error, status = 500, message = "FAILED") => {
    res.status(status).json({
        status: "FAILED",
        message: error.message || message
    });
};

const addInventoryDet = async (req, res) => {
    try {
        const prefix = 'NHIN';
=======
const addInventoryDet = async (req, res) => {

    try {
        const prefix = 'NHIN'
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
        const inventryID = await getNextSerialNumber(prefix);

        let payload = {
            inventoryID: inventryID,
            itemName: req.body.itemName,
            categoryFixedAsset: req.body.categoryFixedAsset,
            categoryFloatingAsset: req.body.categoryFloatingAsset,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice,
            supplierName: req.body.supplierName,
            receivedDate: req.body.receivedDate,
            expirationDate: req.body.expirationDate,
            currentStockLevel: req.body.currentStockLevel,
            created_by: req.body.userId,
            userId: req.body.userId,
            isActive: true
<<<<<<< HEAD
        };

        await InventoryDB.create(payload);
        res.status(200).json({
=======
        }

        const data = await InventoryDB.create(payload);
        res.json({
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
            status: "SUCCESS",
            message: "Inventory Details created!"
        });

<<<<<<< HEAD
    } catch (error) {
        handleError(res, error);
    }
};

const getInventoryDetls = async (req, res) => {
=======
    }
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
}

const getInventoryDetls = async (req, res) => {

>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
    try {
        let inventoryDetls = await InventoryDB.findAll({
            where: { isActive: true },
            order: [['createdAt', 'ASC']]
<<<<<<< HEAD
        });
        res.status(200).json(inventoryDetls);
    } catch (error) {
        handleError(res, error);
    }
};

const updateInventoryDet = async (req, res) => {
    let id = req.params.id;
    try {
        await InventoryDB.update(req.body, { where: { id: id } });
        res.status(200).json({
=======
        })
        res.send(200).send(inventoryDetls)
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error
        });
    }
}

const updateInventoryDet = async (req, res) => {
    let id = req.params.id

    try {
        const updateDet = await InventoryDB.update(req.body, { where: { id: id } });
        res.json({
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
            status: "SUCCESS",
            message: "Inventory details updated",
        });
    } catch (error) {
<<<<<<< HEAD
        handleError(res, error);
    }
};

const deleteInventory = async (req, res) => {
    let id = req.params.id;
    try {
        await InventoryDB.update({ isActive: false }, { where: { id: id } });
        res.status(200).json({
=======
        res.json({
            status: "FAILED",
            message: error
        });
    }
}

const deleteInventory = async (req, res) => {
    let id = req.params.id

    try {
        const inventoryDet = await InventoryDB.update({ isActive: false }, { where: { id: id } });

        res.json({
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
            status: "SUCCESS",
            message: "Inventory details deleted"
        });
    } catch (error) {
<<<<<<< HEAD
        handleError(res, error, 500, "Delete failed");
    }
};

module.exports = {
    addInventoryDet,
    getInventoryDetls,
    updateInventoryDet,
    deleteInventory
};
=======
        res.status(500).send({
            message: "Delete failed",
        });
    }
}

module.exports = {
    addInventoryDet, getInventoryDetls, updateInventoryDet, deleteInventory
}
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
