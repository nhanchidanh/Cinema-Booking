const { DataTypes } = require("sequelize");
const db = require("../config/database");
const PromotionHeader = require("./PromotionHeader");
const PromotionLine = require("./PromotionLine");
const Order = require("./Order");

const PromotionResult = db.define(
  "PromotionResult",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    note: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    idProductRecive: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    qtyRecive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moneyDiscount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    idPromotionLine: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idOrder: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idCustomer: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    dateUsed: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PromotionResult.belongsTo(PromotionLine, { foreignKey: "idPromotionLine" });
PromotionLine.hasMany(PromotionResult, { foreignKey: "idPromotionLine" });

PromotionResult.belongsTo(Order, { foreignKey: "idOrder" });
Order.hasMany(PromotionResult, { as: 'promotion_result', foreignKey: "idOrder" });

module.exports = PromotionResult;
