module.exports = (sequelize, DataTypes) => {
    const Genset = sequelize.define("genset", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        avg_voltage_pn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_voltage_pp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_power_kva: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_power_pw: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        power_factor: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total_working_capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        running_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fuel_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        loads: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coolant_temp: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        engine_speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alternator_voltage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lube_oil_pressure: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        alternator_current: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        battery_voltage: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        shutdowns: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        warnings: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
        {
            freezeTableName: true,
            timestamps: true
        });


    return Genset

}
