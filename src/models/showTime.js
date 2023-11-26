const { DataTypes } = require("sequelize");
const db = require("../config/database");

const ShowTime = db.define(
    "ShowTime",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        showTime: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

    },
    {
        freezeTableName: true,
    }
);
// default data 
// ShowTime.sync({ force: false }).then(() => {
//     ShowTime.create({
//         showTime: "9:00",
//     });
//     ShowTime.create({
//         showTime: "11:00",
//     });
//     ShowTime.create({
//         showTime: "12:00",
//     });
//     ShowTime.create({
//         showTime: "13:00",
//     });
//     ShowTime.create({
//         showTime: "15:00",
//     });
//     ShowTime.create({
//         showTime: "16:00",
//     });
//     ShowTime.create({
//         showTime: "17:00",
//     });
//     ShowTime.create({
//         showTime: "18:00",
//     });
//     ShowTime.create({
//         showTime: "19:00",
//     });
//     ShowTime.create({
//         showTime: "20:00",
//     });
//     ShowTime.create({
//         showTime: "22:00",
//     });
//     ShowTime.create({
//         showTime: "23:00",
//     });
// });


module.exports = ShowTime;