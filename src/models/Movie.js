const { DataTypes } = require("sequelize");
const db = require("../config/database");
const CategoryMovie = require("../models/CategoryMovie");
const Cinema = require("../models/Cinema");

const Movie = db.define(
  "Movie",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    nameMovie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    codeMovie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cast: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    classify: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    linkTrailer: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    idCategoryMovie: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    idCinema: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      // add a FULLTEXT index
      { type: "FULLTEXT", name: "text_idx", fields: ["nameMovie"] },
    ],
  }
);

Movie.beforeCreate(async (instance) => {
  const movie = await Movie.findOne({
    order: [["id", "DESC"]],
  });
  if (movie) {
    instance.codeMovie = "MOV" + String(movie.id + 1).padStart(5, "0");
  } else {
    instance.codeMovie = "MOV" + String(1).padStart(5, "0");
  }
});

Movie.belongsTo(CategoryMovie, {
  as: "category",
  foreignKey: "idCategoryMovie",
});
CategoryMovie.hasMany(Movie, { foreignKey: "idCategoryMovie" });

Movie.belongsTo(Cinema, { as: "cinema", foreignKey: "idCinema" });
Cinema.hasMany(Movie, { foreignKey: "idCinema" });

module.exports = Movie;
