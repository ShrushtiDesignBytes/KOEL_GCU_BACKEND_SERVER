module.exports = (sequelize, DataTypes) => {
    const Mains = sequelize.define("mains", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        main_voltage_ry: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        main_voltage_yb: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        main_voltage_rb: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        frequency: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phase_angle: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },
        {
            freezeTableName: true,
            timestamps: true
        });


    return Mains
}
