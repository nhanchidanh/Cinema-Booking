const { DataTypes } = require("sequelize");
const db = require("../config/database");
const CinemaHall = require("../models/CinemaHall");
const Product = require("../models/Product");

const CinemaHallSeat = db.define(
  "CinemaHallSeat",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    seatColumn: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
     seatRow: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    idCinemaHall: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status:{
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    idProduct:{
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

CinemaHallSeat.belongsTo(CinemaHall, { foreignKey: "idCinemaHall" });
CinemaHall.hasMany(CinemaHallSeat, { foreignKey: "idCinemaHall" });

CinemaHallSeat.belongsTo(Product, { foreignKey: "idProduct" });
Product.hasMany(CinemaHallSeat, { foreignKey: "idProduct" });

module.exports = CinemaHallSeat;
