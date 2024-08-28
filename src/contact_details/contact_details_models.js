module.exports = (sequelize, DataTypes) => {
    const ContactDetails = sequelize.define("contact_details", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        local_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        koel_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        koel_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local_address: {
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


    return ContactDetails

}
