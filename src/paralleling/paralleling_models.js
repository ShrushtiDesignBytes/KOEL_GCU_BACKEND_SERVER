module.exports = (sequelize, DataTypes) => {
    const Paralleling = sequelize.define("paralleling", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sync: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sync_degree: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sync_voltage: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        sync_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_power_kva: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_power_kw: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_power_kvahr: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        voltage: {
            type: DataTypes.DECIMAL,
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


    return Paralleling

}
