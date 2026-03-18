<<<<<<< HEAD
const { verifyToken, isAdmin } = require('../middleware/authJwt')

module.exports = app => {
    const activityType = require('../controllers/activityType.controller')

    app.post('/addActivity', [verifyToken, isAdmin], activityType.addTypes)
    app.get('/getAllActivityDetls', activityType.getActivityDet)
    app.put('/updateDet/:id', [verifyToken, isAdmin], activityType.updateActivities)
    app.put('/deleteDet/:id', [verifyToken, isAdmin], activityType.deleteActivities)
=======
module.exports = app => {
    const activityType = require('../controllers/activityType.controller')

    app.post('/addActivity', activityType.addTypes)
    app.get('/getAllActivityDetls', activityType.getActivityDet)
    app.put('/updateDet/:id', activityType.updateActivities)
    app.put('/deleteDet/:id', activityType.deleteActivities)
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
}