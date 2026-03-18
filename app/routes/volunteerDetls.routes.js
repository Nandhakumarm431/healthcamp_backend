module.exports = app => {
    const volunterAPI = require('../controllers/volunteer.controller.js')

    app.post('/addVolunteer', volunterAPI.addVolunteerDetls)

    app.get('/getVolunteerDet', volunterAPI.getVolunteerDetails)
    app.get('/getVolCamps', volunterAPI.getVolunteerCamps)
    app.get('/getVolunteersNames', volunterAPI.getVolunteersNames)
    app.get('/getOneVolunteerDet/:id', volunterAPI.getOneVolunteerDetail)
    // app.get('/getCampVolunteer/:id',volunterAPI.getCampbasedVolunteerDetls)
    app.put('/updateVolunteer/:id', volunterAPI.updateVolunteerDtl)
<<<<<<< HEAD
    app.put('/deleteVolunteer/:id', [verifyToken, isAdmin], volunterAPI.deleteVolunteer)
=======
    app.put('/deleteVolunteer/:id', volunterAPI.deleteVolunteer)
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c

}