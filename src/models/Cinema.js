const { DataTypes } = require("sequelize");
const db = require("../config/database");


const Cinema = db.define(
  "Cinema",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    codeCinema: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descCinemaHall: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    district_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ward_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Cinema;
