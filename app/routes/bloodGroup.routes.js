<<<<<<< HEAD
module.exports = app => {
    const bloodGroupAPI = require('../controllers/bloodGroup.controller')

    app.post('/addBloodGroup', [verifyToken, isAdmin], bloodGroupAPI.addBloodGroup)
    app.get('/getBloodGroups', bloodGroupAPI.getBloodGroups)
=======
module.exports = app =>{
    const bloodGroupAPI = require('../controllers/bloodGroup.controller')

    app.post('/addBloodGroup',bloodGroupAPI.addBloodGroup)
    app.get('/getBloodGroups',bloodGroupAPI.getBloodGroups)
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
}