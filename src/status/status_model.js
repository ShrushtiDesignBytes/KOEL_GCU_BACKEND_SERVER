
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("status", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        status_A: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        status_B: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        data_sent:{
            type: DataTypes.BOOLEAN,
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


    return Status

}
