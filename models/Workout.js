const { Model, DataTypes } = require('sequelize');
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
        exercise: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        date: {
            type: DataTypes.STRING,
        },
        completed: {
            type: DataTypes.BOOLEAN
        },
        // Foreign key that references id in User model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
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
