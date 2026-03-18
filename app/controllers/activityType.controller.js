const db = require('../models')
const activityTypes = db.actvityTypes;
<<<<<<< HEAD

=======
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
const addTypes = async (req, res) => {
    let payload = {
        activityName: req.body.activityName,
        created_by: req.body.created_by,
        activeStatus: true
    }
    try {
        const existData = await activityTypes.findOne({ where: { activityName: req.body.activityName } });
        if (!req.body.activityName) {
            res.json({
                status: "FAILED",
                message: "Empty Input fields!"
            });
        }
<<<<<<< HEAD
        else if (existData) { 
=======
        else if (existData) {
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
            res.json({
                status: "FAILED",
                message: "Activity type already present!"
            });
        } else {
            const data = await activityTypes.create(payload)
            res.json({
                status: "SUCCESS",
                message: "Added!"
            });
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error
        });
    }
}
<<<<<<< HEAD

=======
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
const getActivityDet = async (req, res) => {
    try {
        let actvityDet = await activityTypes.findAll()
        res.status(200).send(actvityDet)
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error
        });
    }
}
<<<<<<< HEAD

=======
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
const updateActivities = async (req, res) => {
    let id = req.params.id
    try {
        const actvityDet = await activityTypes.update(req.body, { where: { id: id } });
        res.json({
            status: "SUCCESS",
            message: "Activity details updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Update Failed",
        });
    }
}
<<<<<<< HEAD

=======
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
const deleteActivities = async (req, res) => {
    let id = req.params.id
    try {
        const actvityDet = await activityTypes.update({ activeStatus: false }, { where: { id: id } });
        res.json({
            status: "SUCCESS",
            message: "Activity details deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Delete failed",
        });
    }
}
<<<<<<< HEAD


=======
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
module.exports = {
    addTypes,
    getActivityDet,
    updateActivities,
    deleteActivities
}