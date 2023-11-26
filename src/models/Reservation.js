const { DataTypes } = require("sequelize");
const db = require("../config/database");
const ShowMovie = require("../models/ShowMovie");
const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const PromotionLine = require("../models/PromotionLine");


const Reservation = db.define(
    "Reservation",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        idShowMovie: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        idCustomer: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        idStaff: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        idPromotionLine: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        totalMoney: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);



module.exports = Reservation;