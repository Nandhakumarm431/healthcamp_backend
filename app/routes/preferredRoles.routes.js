module.exports = app => {
    const preferredRole = require('../controllers/preferredRoles.controller')

    app.post('/addPreRole', [verifyToken, isAdmin], preferredRole.addPreRole)
    app.get('/getAllPreRoleDetls', preferredRole.getPreRoleDet)
    app.put('/updatePreRoleDet/:id', [verifyToken, isAdmin], preferredRole.updatePreRole)
    app.put('/deletePreRoleDet/:id', [verifyToken, isAdmin], preferredRole.deletePreRole)
}