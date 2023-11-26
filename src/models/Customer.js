const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Rank = require("./Rank");

const Customer = db.define(
  "Customer",
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
    },
    email: {
      type: DataTypes.STRING(50),
      // unique: true,
      allowNull: true,

    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(10),
      // unique: true,
      allowNull: false,

    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,

    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    city_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    district_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ward_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rank_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Customer.beforeCreate(async(customer, options) => {
  const cus = await Customer.findOne({
    order: [["id", "DESC"]],
  });
  if (cus) {
    customer.code = "CUS" + String(cus.id + 1).padStart(5, "0");
  } else {
    customer.code = "CUS" + String(1).padStart(5, "0");
  }
});

Customer.belongsTo(Rank,{foreignKey: "rank_id"});
Rank.hasMany(Customer,{foreignKey: "rank_id"});

module.exports = Customer;
