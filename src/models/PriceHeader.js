const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Staff = require("./Staff");

const PriceHeader = db.define(
  "PriceHeader",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userCreate: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    userUpdate: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    priceCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PriceHeader.belongsTo(Staff, { as: "user_create", foreignKey: "userCreate" });
Staff.hasMany(PriceHeader, {
  foreignKey: "userCreate",
});

PriceHeader.belongsTo(Staff, { as: "user_update", foreignKey: "userUpdate" });
Staff.hasMany(PriceHeader, {
  foreignKey: "userUpdate",
});

module.exports = PriceHeader;
