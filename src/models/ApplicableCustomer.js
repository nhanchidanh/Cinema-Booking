const { DataTypes } = require("sequelize");
const db = require("../config/database");
const PromotionHeader = require("./PromotionHeader");
const Rank = require("./Rank");

const ApplicableCustomer = db.define(
    "ApplicableCustomer",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        rank_id: {
            type: DataTypes.BIGINT,
        },
        promotionHeader_id: {
            type: DataTypes.BIGINT,
        },
    },
    {
        freezeTableName: true,
    }
);

ApplicableCustomer.belongsTo(PromotionHeader, {
    foreignKey: "promotionHeader_id",
    as: "promotionHeader",
});
PromotionHeader.hasMany(ApplicableCustomer, {
    foreignKey: "promotionHeader_id",
    as: "promotionHeader",
});

ApplicableCustomer.belongsTo(Rank, {
    foreignKey: "rank_id",
    as: "rank",
});
Rank.hasMany(ApplicableCustomer, {
    foreignKey: "rank_id",
    as: "rank",
});




module.exports = ApplicableCustomer;