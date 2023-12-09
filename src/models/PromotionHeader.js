const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PromotionHeader = db.define(
  "PromotionHeader",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    namePromotion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    statusPromotion: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    promotionCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PromotionHeader.beforeCreate(async (instance) => {
  const promotionHeader = await PromotionHeader.findOne({
    order: [["id", "DESC"]],
  });
  if (promotionHeader) {
    instance.promotionCode =
      "PRO" + String(promotionHeader.id + 1).padStart(5, "0");
  } else {
    instance.promotionCode = "PRO" + String(1).padStart(5, "0");
  }
});

module.exports = PromotionHeader;
