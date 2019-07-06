import Sequelize from 'sequelize'

export const sequelize = new Sequelize('finchain', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully")
}).catch(err => {
    console.log("Unable to connect to the database: ", err)
})

sequelize.sync({ force: false })