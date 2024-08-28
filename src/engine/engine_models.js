module.exports = (sequelize, DataTypes) => {
    const Engine = sequelize.define("engine", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        running_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        engine_speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        battery_voltage: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lube_oil_pressure: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        coolant_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        canopy_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        fuel_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        exhaust_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lube_oil_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        manifold_temperature: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        manifold_pressure: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        turbo_speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fuel_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shutdowns: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        warnings: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maintainance_last_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        maintainance_next_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

        },
        maintainance_time_left: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maintainance_running_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdlocal_db: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedlocal_db: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }

    },
        {
            freezeTableName: true,
            timestamps: true
        });


    return Engine

}
