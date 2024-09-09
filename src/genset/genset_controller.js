var db = require('../../config/db');
const Genset = db.genset;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all genset
    getGenset: async (req, res) => {
        try {
        const genset = await Genset.findAll();
            const datawithIST = genset.map(record => {
                return {
                    ...record.dataValues,
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
           });
        //    const genset = await Genset.findOne({
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
    createGenset: async (req, res) => {
        const { avg_voltage_pn, avg_voltage_pp, avg_power_kva, avg_power_pw, frequency, power_factor, total_working_capacity, running_time, fuel_level,
            loads, coolant_temp, engine_speed, alternator_voltage, lube_oil_pressure, alternator_current, battery_voltage, shutdowns, warnings, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const genset = await Genset.create({
                avg_voltage_pn, avg_voltage_pp, avg_power_kva, avg_power_pw, frequency, power_factor, total_working_capacity, running_time, fuel_level,
                loads, coolant_temp, engine_speed, alternator_voltage, lube_oil_pressure, alternator_current, battery_voltage, shutdowns, warnings, createdlocal_db, updatedlocal_db
            });

            const datawithIST = {
                    ...genset.dataValues,
                    createdlocal_db: convertToIST(genset.createdlocal_db),
                    updatedlocal_db: convertToIST(genset.updatedlocal_db),
                    createdAt: convertToIST(genset.createdAt),
                    updatedAt: convertToIST(genset.updatedAt),
                }
            
            return res.status(200).send(
                //genset
                datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view genset by id
    viewGenset: async (req, res) => {
        const id = req.params.id
        try {
            const genset = await Genset.findByPk(id);
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
    deleteGenset: async (req, res) => {
        const id = req.params.id;
        try {
            const genset = await Genset.destroy({ where: { id } });
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
    updateGenset: async (req, res) => {
        const id = req.params.id;
        const { avg_voltage_pn, avg_voltage_pp, avg_power_kva, avg_power_pw, frequency, power_factor, total_working_capacity, running_time, fuel_level,
            loads, coolant_temp, engine_speed, alternator_voltage, lube_oil_pressure, alternator_current, battery_voltage, shutdowns, warnings, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const genset = await Genset.update({
                avg_voltage_pn, avg_voltage_pp, avg_power_kva, avg_power_pw, frequency, power_factor, total_working_capacity, running_time, fuel_level,
                loads, coolant_temp, engine_speed, alternator_voltage, lube_oil_pressure, alternator_current, battery_voltage, shutdowns, warnings, createdlocal_db, updatedlocal_db
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