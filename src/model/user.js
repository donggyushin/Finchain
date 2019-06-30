import { sequelize } from '../db_connection/sequelizer'
import Sequelize from 'sequelize'
const Model = Sequelize.Model;
class User extends Model { }
User.init({
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identifier: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
        sequelize,
        modelName: 'user'
    })
