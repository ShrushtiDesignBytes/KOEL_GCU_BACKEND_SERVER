var db = require('../../config/db');
const Alternator = db.alternator;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all alternator
    getAlternator: async (req, res) => {
        try {
            const alternator = await Alternator.findAll();
            const datawithIST = alternator.map(record => {
                return {
                    ...record.dataValues,
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
           });
            return res.status(200).send(
               // alternator
                datawithIST
            );
            
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add alternator
    createAlternator: async (req, res) => {
        const { alternator_voltage, alternator_current, power_factor, kilowatt_hour,frequency,avg_kw,avg_kva,avg_kvar,voltage,apparent_power,energy_chart,active_power,reactive_power,current, power_factor_ryb, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const alternator = await Alternator.create({
                alternator_voltage, alternator_current,power_factor,kilowatt_hour,frequency,avg_kw,avg_kva,avg_kvar,voltage,apparent_power,energy_chart,active_power,reactive_power,current, power_factor_ryb, createdlocal_db, updatedlocal_db
            });

            // const datawithIST = {
            //         ...Alternator.dataValues,
            //         createdAt: convertToIST(Alternator.createdAt),
            //         updatedAt: convertToIST(Alternator.updatedAt),
            //     }
            
            return res.status(200).send(
                alternator
                //datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view alternator by id
    viewAlternator: async (req, res) => {
        const id = req.params.id
        try {
            const alternator = await Alternator.findByPk(id);
            return res.status(200).send(
                alternator
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete alternator by id
    deleteAlternator: async (req, res) => {
        const id = req.params.id;
        try {
            const alternator = await Alternator.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //alternator update by id
    updateAlternator: async (req, res) => {
        const id = req.params.id;
        const { alternator_voltage, alternator_current,power_factor,kilowatt_hour,frequency,avg_kw,avg_kva,avg_kvar,voltage,apparent_power,energy_chart,active_power,reactive_power,current, power_factor_ryb, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const alternator = await Alternator.update({
                alternator_voltage, alternator_current,power_factor,kilowatt_hour,frequency,avg_kw,avg_kva,avg_kvar,voltage,apparent_power,energy_chart,active_power,reactive_power,current, power_factor_ryb, createdlocal_db, updatedlocal_db
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