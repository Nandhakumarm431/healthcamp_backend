module.exports = app => {
    const bloodGroupAPI = require('../controllers/bloodGroup.controller')

    app.post('/addBloodGroup', [verifyToken, isAdmin], bloodGroupAPI.addBloodGroup)
    app.get('/getBloodGroups', bloodGroupAPI.getBloodGroups)
}