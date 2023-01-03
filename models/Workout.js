const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Workout extends Model { }

Workout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
        },
        exercise: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.STRING,
        },
        distance: {
            type: DataTypes.STRING,
        },
        sets: {
            type: DataTypes.INTEGER
        },
        reps: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING
        },
        // look into this!
        date: {
            type: DataTypes.INTEGER,
        },
        completed: {
            type: DataTypes.BOOLEAN
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     },
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'workout',
    }
);

module.exports = Workout;
