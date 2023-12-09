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
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Cinema.beforeCreate(async (instance) => {
  const cinema = await Cinema.findOne({
    order: [["id", "DESC"]],
  });
  if (cinema) {
    instance.codeCinema = "CIN" + String(cinema.id + 1).padStart(5, "0");
  } else {
    instance.codeCinema = "CIN" + String(1).padStart(5, "0");
  }
});

module.exports = Cinema;
