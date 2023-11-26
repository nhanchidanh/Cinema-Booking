const { DataTypes } = require("sequelize");
const db = require("../config/database");
const ShowMovie = require("./showMovie");
const Customer = require("./Customer");
const Staff = require("./Staff");

const Order = db.define(
  "Order",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      // defaultValue: (() =>  "OD" + String(this.id).padStart(5, "0"))
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    paymentMethod: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refundDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    totalDiscount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    numberSeat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    freezeTableName: true,
    timestamps: true,
  }
);

Order.beforeCreate(async(instance) => {
  const or = await Order.findOne({
    order: [["id", "DESC"]],
  });
  if (or) {
    instance.code = "OD" + String(or.id + 1).padStart(5, "0");
  } else {
    instance.code = "OD" + String(1).padStart(5, "0");
  }
});


Order.belongsTo(ShowMovie, { foreignKey: "idShowMovie" });
ShowMovie.hasMany(Order, { foreignKey: "idShowMovie" });

Order.belongsTo(Customer, { as: 'Customer'  ,foreignKey: "idCustomer" });
Customer.hasMany(Order, {  foreignKey: "idCustomer" });

Order.belongsTo(Staff, { foreignKey: "idStaff" });
Staff.hasMany(Order, { foreignKey: "idStaff" });


module.exports = Order;
