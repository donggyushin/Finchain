import Sequelize from "sequelize";

let env = process.env.NODE_ENV;

let DB_NAME = "";
let USER = "";
let PASSWORD = "";
let HOST = "";
if (env == "dev") {
  DB_NAME = "finchain";
  USER = "root";
  PASSWORD = "1234";
  HOST = "localhost";
} else {
  DB_NAME = "donggyu9410";
  USER = "donggyu9410";
  PASSWORD = "q1w2e3r4";
  HOST = "finchain.cafe24app.com";
}

export const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch(err => {
    console.log("Unable to connect to the database: ", err);
  });

sequelize.sync({ force: false });
