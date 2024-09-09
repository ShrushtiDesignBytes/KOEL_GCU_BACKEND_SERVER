var db = require('../../config/db');
const Contact = db.contact;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all contact
    getContact: async (req, res) => {
        try {
            const contact = await Contact.findAll();
            const datawithIST = contact.map(record => {
                return {
                    ...record.dataValues,
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
           });
            return res.status(200).send(
               // contact
                datawithIST
            );
            
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add contact
    createContact: async (req, res) => {
        const { local_email, local_phone, koel_email, koel_phone, local_address, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const contact = await Contact.create({
                local_email, local_phone, koel_email, koel_phone, local_address, createdlocal_db, updatedlocal_db
            });

            const datawithIST = {
                    ...contact.dataValues,
                    createdlocal_db: convertToIST(contact.createdlocal_db),
                    updatedlocal_db: convertToIST(contact.updatedlocal_db),
                    createdAt: convertToIST(contact.createdAt),
                    updatedAt: convertToIST(contact.updatedAt),
                }
            
            return res.status(200).send(
               // contact
                datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view contact by id
    viewContact: async (req, res) => {
        const id = req.params.id
        try {
            const contact = await Contact.findByPk(id);
            return res.status(200).send(
                contact
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete contact by id
    deleteContact: async (req, res) => {
        const id = req.params.id;
        try {
            const contact = await Contact.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //contact update by id
    updateContact: async (req, res) => {
        const id = req.params.id;
        const { local_email, local_phone, koel_email, koel_phone, local_address, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const ids = await Contact.findByPk(id);
            if (ids) {
                const contact = await Contact.update({
                    local_email, local_phone, koel_email, koel_phone, local_address, createdlocal_db, updatedlocal_db
                },
                    {
                        where: { id }
                    });
                const data = await Contact.findByPk(id);
                return res.status(200).send({
                    message: 'Updated Successfully',
                    data: data
                });
            } else {
                return res.status(400).send({
                    message: 'Id is not found',
                });
            }
            
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    }
}