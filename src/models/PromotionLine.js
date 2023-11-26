const { DataTypes } = require("sequelize");
const db = require("../config/database");
const PromotionHeader = require("./PromotionHeader");

const PromotionLine = db.define(
  "PromotionLine",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    promotionCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    max_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1000000,
    },
    max_qty_per_customer_per_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1000000,
    },
    budget: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    promotionHeaderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PromotionLine.belongsTo(PromotionHeader, { foreignKey: "promotionHeaderId" });
PromotionHeader.hasMany(PromotionLine, { foreignKey: "promotionHeaderId" });

module.exports = PromotionLine;
