module.exports = (sequelize, DataTypes) => {
    const Alternator = sequelize.define("alternator", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        alternator_voltage: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        alternator_current: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        power_factor: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        kilowatt_hour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_kw: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_kva: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_kvar: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        voltage: {
            type: DataTypes.JSON,
            allowNull: false
        },
        apparent_power: {
            type: DataTypes.JSON,
            allowNull: false
        },
        energy_chart: {
            type: DataTypes.JSON,
            allowNull: false
        },
        active_power: {
            type: DataTypes.JSON,
            allowNull: false
        },
        reactive_power: {
            type: DataTypes.JSON,
            allowNull: false
        },
        current: {
            type: DataTypes.JSON,
            allowNull: false
        },
        power_factor_ryb: {
            type: DataTypes.JSON,
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
            timestamps: false
        });


    return Alternator
}
