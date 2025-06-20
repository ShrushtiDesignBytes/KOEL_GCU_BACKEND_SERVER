
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("status", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        start_stop: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        auto_manual: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        breakeropen_close: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        reset: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        cooldown: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1, 
        },
        timer: {
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
