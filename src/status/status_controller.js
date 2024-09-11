var db = require('../../config/db');
const Status = db.status;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all genset
    getStatus: async (req, res) => {
        try {
        const status = await Status.findAll();
        //    const genset = await Genset.findOne({
        //     order: [['createdAt', 'DESC']]
        //   });
        const datawithIST = status.map(record => {
            return {
                ...record.dataValues,
                createdlocal_db: convertToIST(record.createdlocal_db),
                updatedlocal_db: convertToIST(record.updatedlocal_db),
                createdAt: convertToIST(record.createdAt),
                updatedAt: convertToIST(record.updatedAt),
            }
       });
            return res.status(200).send(
               //status
              datawithIST
            );
            
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add genset
    createStatus: async (req, res) => {
        const { status, status_A, status_B, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const data = await Status.create({
                status, status_A, status_B, createdlocal_db, updatedlocal_db
            });

            // const datawithIST = {
            //         ...genset.dataValues,
            //         createdAt: convertToIST(genset.createdAt),
            //         updatedAt: convertToIST(genset.updatedAt),
            //     }
            
            return res.status(200).send(
              data
                //datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //genset update by id
    updateStatus: async (req, res) => {
        const id = req.params.id;
        const {status, status_A, status_B, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const data = await Status.update({
                status, status_A, status_B, createdlocal_db, updatedlocal_db
            },
                {
                    where: { id }
                });
            return res.status(200).send({
                message: 'Updated Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    }
}