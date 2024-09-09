module.exports = (sequelize, DataTypes) => {
    const Alerts = sequelize.define("alerts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        faultCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        faultType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alertCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        resolved:  {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.STRING,
        },
        additionalInfo: {
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


    return Alerts
}
