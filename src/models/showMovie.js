const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Show = require("../models/Show");
const ShowTime = require("../models/showTime");

const ShowMovie = db.define(
    "ShowMovie",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        idShow: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        idShowTime: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        showDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1,
        },
        statusDate: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1,
        },

    },
    {
        freezeTableName: true,
    }
);

ShowMovie.belongsTo(Show, { foreignKey: "idShow" });
Show.hasMany(ShowMovie, { foreignKey: "idShow" });

ShowMovie.belongsTo(ShowTime, { foreignKey: "idShowTime" });
ShowTime.hasMany(ShowMovie, { foreignKey: "idShowTime" });

module.exports = ShowMovie;