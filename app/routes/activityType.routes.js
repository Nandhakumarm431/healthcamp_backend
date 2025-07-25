const { verifyToken, isAdmin } = require('../middleware/authJwt')

module.exports = app => {
    const activityType = require('../controllers/activityType.controller')

    app.post('/addActivity', [verifyToken, isAdmin], activityType.addTypes)
    app.get('/getAllActivityDetls', activityType.getActivityDet)
    app.put('/updateDet/:id', [verifyToken, isAdmin], activityType.updateActivities)
    app.put('/deleteDet/:id', [verifyToken, isAdmin], activityType.deleteActivities)
}