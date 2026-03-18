module.exports = app => {
    const organizationDet = require('../controllers/organizationDet.controller')

<<<<<<< HEAD
    app.post('/addOrgn', [verifyToken, isAdmin], organizationDet.addOrgns)
    app.get('/getAllOrgnDetls', organizationDet.getOrgnzationDet)
    app.put('/updateOrgDet/:id', [verifyToken, isAdmin], organizationDet.updateOrganiztin)
    app.put('/deleteOrgDet/:id', [verifyToken, isAdmin], organizationDet.deleteOrganztn)
=======
    app.post('/addOrgn', organizationDet.addOrgns)
    app.get('/getAllOrgnDetls', organizationDet.getOrgnzationDet)
    app.put('/updateOrgDet/:id', organizationDet.updateOrganiztin)
    app.put('/deleteOrgDet/:id', organizationDet.deleteOrganztn)
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
}