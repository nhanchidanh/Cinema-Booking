const { DataTypes } = require("sequelize");
const db = require("../config/database");
const CinemaHall = require("../models/CinemaHall");
const Movie = require("../models/Movie"); 
const Cinema = require("../models/Cinema");

const Show = db.define(
  "Show",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idCinemaHall: { 
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idMovie: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idCinema: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      // defaultValue: (() =>  "OD" + String(this.id).padStart(5, "0"))
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Show.beforeCreate( async (instance) => {
  const show = await Show.findOne({
    order: [["id", "DESC"]],
  });
  if (show) {
    instance.code = "SCH" + String(show.id + 1).padStart(5, "0");
  } else {
    instance.code = "SCH" + String(1).padStart(5, "0");
  }
});

Show.belongsTo(CinemaHall, { foreignKey: "idCinemaHall" });
CinemaHall.hasMany(Show, { foreignKey: "idCinemaHall" });

Show.belongsTo(Movie, { foreignKey: "idMovie" });
Movie.hasMany(Show, { foreignKey: "idMovie" });

Show.belongsTo(Cinema, { foreignKey: "idCinema" });
Cinema.hasMany(Show, { foreignKey: "idCinema" });



module.exports = Show;
