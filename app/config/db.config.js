const { Sequelize } = require("sequelize");
const fs = require('fs');

<<<<<<< HEAD
=======

>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE, 
<<<<<<< HEAD
  dialect: process.env.DB_DIALECT,
  ssl: true,
  port: 3306,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync(__basedir + "/resources/static/certificate/BaltimoreCyberTrustRoot.crt.pem")
    }
  },
=======
  dialect: "postgres",
	ssl:false,
	dialectOptions: {
		ssl: {
			require: false,
			rejectUnauthorized: false,
		},
   },
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 602f9544cf77b66764ab0effc52c232aff4ae25c
