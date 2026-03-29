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
  });
};

isuser = (req, res, next) => {
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
  });
};

isuserOrAdmin = (req, res, next) => {
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


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isuser: isuser,
  isuserOrAdmin: isuserOrAdmin
};

module.exports = authJwt;