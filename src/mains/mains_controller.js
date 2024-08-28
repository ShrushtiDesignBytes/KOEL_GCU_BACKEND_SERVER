var db = require('../../config/db');
const Mains = db.mains;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all mains
    getMains: async (req, res) => {
        try {
            const mains = await Mains.findAll();
            const datawithIST = mains.map(record => {
                return {
                    ...record.dataValues,
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
           });
            return res.status(200).send(
                //mains
                datawithIST
            );
            
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add mains
    createMains: async (req, res) => {
        const { main_voltage_ry, main_voltage_yb, main_voltage_rb, frequency, phase_angle, createdlocal_db, updatedlocal_db} = req.body;
        try {
            const mains = await Mains.create({
                main_voltage_ry, main_voltage_yb, main_voltage_rb, frequency, phase_angle, createdlocal_db, updatedlocal_db
            });

            // const datawithIST = {
            //         ...Mains.dataValues,
            //         createdAt: convertToIST(Mains.createdAt),
            //         updatedAt: convertToIST(Mains.updatedAt),
            //     }
            
            return res.status(200).send(
                mains
                //datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view mains by id
    viewMains: async (req, res) => {
        const id = req.params.id
        try {
            const mains = await Mains.findByPk(id);
            return res.status(200).send(
                mains
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete mains by id
    deleteMains: async (req, res) => {
        const id = req.params.id;
        try {
            const mains = await Mains.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //mains update by id
    updateMains: async (req, res) => {
        const id = req.params.id;
        const { main_voltage_ry, main_voltage_yb, main_voltage_rb, frequency, phase_angle, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const mains = await Mains.update({
                main_voltage_ry, main_voltage_yb, main_voltage_rb, frequency, phase_angle, createdlocal_db, updatedlocal_db
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