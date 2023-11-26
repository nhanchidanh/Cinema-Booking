const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Product = require("./Product");
const Order = require("./Order");
const CinemaHallSeat = require("./CinemaHallSeat");

const OrderDetail = db.define(
  "OrderDetail",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idSeat: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    idProduct: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    qtyProduct: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    priceProduct: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    idProductReceived: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    qtyProductReceived: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    priceProductReceived: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },

    idOrder: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

OrderDetail.belongsTo(CinemaHallSeat, { foreignKey: "idSeat" });
CinemaHallSeat.hasMany(OrderDetail, { foreignKey: "idSeat" });

OrderDetail.belongsTo(Order, { foreignKey: "idOrder" });
Order.hasMany(OrderDetail, { foreignKey: "idOrder" });

OrderDetail.belongsTo(Product, { foreignKey: "idProduct" });
Product.hasMany(OrderDetail, { foreignKey: "idProduct" });

module.exports = OrderDetail;
