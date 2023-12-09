const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "Product",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    typeSeat: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Product.beforeCreate(async (instance) => {
  const product = await Product.findOne({
    order: [["id", "DESC"]],
  });
  if (product) {
    instance.productCode = "PRD" + String(product.id + 1).padStart(5, "0");
  } else {
    instance.productCode = "PRD" + String(1).padStart(5, "0");
  }
});

module.exports = Product;
