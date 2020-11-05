const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Stylist extends Model {}

Stylist.init(
    {
        //table definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        salon_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
           type: DataTypes.STRING,
           allowNull: false
       },
        last_name: {
           type: DataTypes.STRING,
           allowNull: false
       },
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        //table configuration
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'stylist'
    }

);

module.exports = Stylist;