const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('journal', {
        decription: {
            type: DataTypes.STRING,
            allowNull: true
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
        type: DataTypes.STRING,
        allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Journal;
};

