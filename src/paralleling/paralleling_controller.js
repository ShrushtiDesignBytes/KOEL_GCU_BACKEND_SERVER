var db = require('../../config/db');
const Paralleling = db.paralleling;
const moment = require('moment-timezone');
const sequelize = db.sequelize;

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all genset
    getParalleling: async (req, res) => {
        try {
            const paralleling = await Paralleling.findAll();
            const datawithIST = paralleling.map(record => {
                return {
                    ...record.dataValues,
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
            });
            //    const genset = await Paralleling.findOne({
            //     order: [['createdAt', 'DESC']]
            //   });


            return res.status(200).send(
                // genset
                datawithIST
            );

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add genset
    createParalleling: async (req, res) => {
        const { sync,
            sync_degree,
            sync_voltage,
            sync_frequency,
            avg_power_kva,
            avg_power_kw,
            avg_power_kvahr,
            voltage,
            frequency,
            power_factor, total_kw, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const paralleling = await Paralleling.create({
                sync,
                sync_degree,
                sync_voltage,
                sync_frequency,
                avg_power_kva,
                avg_power_kw,
                avg_power_kvahr,
                voltage,
                frequency,
                power_factor, total_kw, createdlocal_db, updatedlocal_db
            });

            const datawithIST = {
                ...paralleling.dataValues,
                createdlocal_db: convertToIST(Paralleling.createdlocal_db),
                updatedlocal_db: convertToIST(Paralleling.updatedlocal_db),
            }

            return res.status(200).send(
                // genset
                datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view genset by id
    viewParalleling: async (req, res) => {
        const id = req.params.id
        try {
            const genset = await Paralleling.findByPk(id);
            return res.status(200).send(
                genset
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete genset by id
    deleteParalleling: async (req, res) => {
        const id = req.params.id;
        try {
            const genset = await Paralleling.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //genset update by id
    updateParalleling: async (req, res) => {
        const id = req.params.id;
        const { sync,
            sync_degree,
            sync_voltage,
            sync_frequency,
            avg_power_kva,
            avg_power_kw,
            avg_power_kvahr,
            voltage,
            frequency,
            power_factor, total_kw, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const genset = await Paralleling.update({
                sync,
                sync_degree,
                sync_voltage,
                sync_frequency,
                avg_power_kva,
                avg_power_kw,
                avg_power_kvahr,
                voltage,
                frequency,
                power_factor, total_kw, createdlocal_db, updatedlocal_db
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