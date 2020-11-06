const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Stylist extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            async beforeCreate(newStylistData) {
                newStylistData.password = await bcrypt.hash(newStylistData.password, 10);
                return newStylistData;
           },
            async beforeUpdate(updatedStylistData) {
               updatedStylistData.password = await bcrypt.hash(updatedStylistData.password, 10);
               return updatedStylistData;
           }
        },
        //table configuration
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'stylist'
    }

);

module.exports = Stylist;