var db = require('../../config/db');
const Contact = db.contact;
const moment = require('moment-timezone');
const sequelize = db.sequelize;

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
        const contactArray = req.body;
     
        try {
            const createdArray = []
            for (const contactData of contactArray) {
                    const { local_email, local_phone, koel_email, koel_phone, local_address, createdlocal_db, updatedlocal_db } = contactData;

                    try {
                        const [result, metadata] = await sequelize.query(`
                            CALL unique_contact_details(
                                :v_local_email, :v_local_phone, :v_koel_email, :v_koel_phone, :v_local_address,
                                :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz, :result_json
                            )
                        `, {
                            replacements: {
                                v_local_email: local_email, 
                                v_local_phone: local_phone, 
                                v_koel_email: koel_email, 
                                v_koel_phone: koel_phone, 
                                v_local_address: local_address,
                                v_createdlocal_db: createdlocal_db,
                                v_updatedlocal_db: updatedlocal_db,
                                result_json: null
                            },
                            type: sequelize.QueryTypes.RAW
                        });
            
                        const contact = result[0].result_json;
            
                        const datawithIST = await contact && {
                                ...contact,
                                createdlocal_db: convertToIST(contact.createdlocal_db),
                                updatedlocal_db: convertToIST(contact.updatedlocal_db),
                                createdAt: convertToIST(contact.createdAt),
                                updatedAt: convertToIST(contact.updatedAt),
                            }
                        
                            const data = contact === null ? 'Already saved same data in database' : datawithIST;
                            createdArray.push(data);
                    } catch (innerError) {
                        createdArray.push({ error: `Failed to process data for genset: ${innerError.message}` });
                    }
                   
                }

            return res.status(200).send(createdArray);
                
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