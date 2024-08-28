module.exports = (sequelize, DataTypes) => {
    const SystemInfo = sequelize.define("system_info", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        g_hardware_V: {
            type: DataTypes.STRING,
            allowNull: false
        },
        g_hardware_S: {
            type: DataTypes.STRING,
            allowNull: false
        },
        g_hardware_P: {
            type: DataTypes.STRING,
            allowNull: false
        },
        g_software_V: {
            type: DataTypes.STRING,
            allowNull: false
        },
        g_software_S: {
            type: DataTypes.STRING,
            allowNull: false
        },
        g_software_P: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_hardware_V: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_hardware_S: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_hardware_P: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_software_V: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_software_S: {
            type: DataTypes.STRING,
            allowNull: false
        },
        h_software_P: {
            type: DataTypes.STRING,
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


    return SystemInfo

}
