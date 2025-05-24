
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
        cooldown: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1, 
        },
        timestamps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
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


    return Status

}
