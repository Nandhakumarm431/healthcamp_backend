module.exports = app => {
    const preferredRole = require('../controllers/preferredRoles.controller')

<<<<<<< HEAD
    app.post('/addPreRole', [verifyToken, isAdmin], preferredRole.addPreRole)
    app.get('/getAllPreRoleDetls', preferredRole.getPreRoleDet)
    app.put('/updatePreRoleDet/:id', [verifyToken, isAdmin], preferredRole.updatePreRole)
    app.put('/deletePreRoleDet/:id', [verifyToken, isAdmin], preferredRole.deletePreRole)
=======
    app.post('/addPreRole', preferredRole.addPreRole)
    app.get('/getAllPreRoleDetls', preferredRole.getPreRoleDet)
    app.put('/updatePreRoleDet/:id', preferredRole.updatePreRole)
    app.put('/deletePreRoleDet/:id', preferredRole.deletePreRole)
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
}