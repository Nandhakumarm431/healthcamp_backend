const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

<<<<<<< HEAD
isAdmin = (req, res, next) => {
  User.findByPk(req.userId, {
    include: ['roles']
  }).then(user => {
    if (!user || !user.roles) {
      return res.status(403).send({ message: "Role not found." });
    }

    const roleName = user.roles.name?.toLowerCase();

    if (["admin", "super admin"].includes(roleName)) {
      return next();
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
=======

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
  });
};

isuser = (req, res, next) => {
<<<<<<< HEAD
  User.findByPk(req.userId, {
    include: ['roles']
  }).then(user => {
    if (!user || !user.roles) {
      return res.status(403).send({ message: "Role not found." });
    }

    if (user.roles.name.toLowerCase() === 'user') {
      return next();
    }

    return res.status(403).send({ message: "Require user Role!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
=======
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require user Role!"
      });
    });
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
  });
};

isuserOrAdmin = (req, res, next) => {
<<<<<<< HEAD
  User.findByPk(req.userId, {
    include: ['roles']
  }).then(user => {
    if (!user || !user.roles) {
      return res.status(403).send({ message: "Role not found." });
    }

    const roleName = user.roles.name?.toLowerCase();

    if (["admin", "user", "super admin"].includes(roleName)) {
      return next();
    }

    return res.status(403).send({
      message: "Require user or Admin Role!"
    });
  });

};


=======
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require user or Admin Role!"
      });
    });
  });
};

>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isuser: isuser,
  isuserOrAdmin: isuserOrAdmin
};

module.exports = authJwt;