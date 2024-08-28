var db = require('../../config/db');
const moment = require('moment-timezone');

const Engine = db.engine;

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

function convert_Maintaince_date(date) {
    return moment(date).tz("Asia/Kolkata").format('DD.MM.YY');
}

module.exports = {

    //get all engine
    getEngine: async (req, res) => {
        try {
            const engine = await Engine.findAll()
            const datawithIST =  engine.map(record => {
                     return {
                    ...record.dataValues,
                    maintainance_last_date: convert_Maintaince_date(record.maintainance_last_date),
                    maintainance_next_date: convert_Maintaince_date(record.maintainance_next_date),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
            })
            return res.status(200).send(
                datawithIST
            );

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add engine
    createEngine: async (req, res) => {
        const { running_time, engine_speed, battery_voltage, lube_oil_pressure, coolant_temperature, canopy_temperature, fuel_temperature, exhaust_temperature, lube_oil_temperature, manifold_temperature, manifold_pressure, turbo_speed, fuel_level, shutdowns, warnings, maintainance_last_date, maintainance_next_date, maintainance_time_left, maintainance_running_time, createdlocal_db, updatedlocal_db  } = req.body;
        try {
            const engine = await Engine.create({
                running_time, engine_speed, battery_voltage, lube_oil_pressure, coolant_temperature, canopy_temperature, fuel_temperature, exhaust_temperature, lube_oil_temperature, manifold_temperature, manifold_pressure, turbo_speed, fuel_level, shutdowns, warnings, maintainance_last_date, maintainance_next_date, maintainance_time_left, maintainance_running_time, createdlocal_db, updatedlocal_db
            });

            const datawithIST = {
                    ...engine.dataValues,
                    maintainance_last_date: convertToIST(engine.maintainance_last_date),
                    maintainance_next_date: convertToIST(engine.maintainance_next_date),
                    createdAt: convertToIST(engine.createdAt),
                    updatedAt: convertToIST(engine.updatedAt),
                }
            return res.status(200).send(
                datawithIST
            );
           
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view engine by id
    viewEngine: async (req, res) => {
        const id = req.params.id
        try {
            const engine = await Engine.findByPk(id);
            return res.status(200).send(
                engine
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete engine by id
    deleteEngine: async (req, res) => {
        const id = req.params.id;
        try {
            const engine = await Engine.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //engine update by id
    updateEngine: async (req, res) => {
        const id = req.params.id;
        const { running_time, engine_speed, battery_voltage, lube_oil_pressure, coolant_temperature, canopy_temperature, fuel_temperature, exhaust_temperature, lube_oil_temperature, manifold_temperature, manifold_pressure, turbo_speed, fuel_level, shutdowns, warnings, maintainance_last_date, maintainance_next_date, maintainance_time_left, maintainance_running_time, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const engineId = await Engine.findByPk(id);
            if(engineId === null){
                return res.status(201).send({
                    message: 'Id is not found'
                });
            }
            const engine = await Engine.update({
                running_time, engine_speed, battery_voltage, lube_oil_pressure, coolant_temperature, canopy_temperature, fuel_temperature, exhaust_temperature, lube_oil_temperature, manifold_temperature, manifold_pressure, turbo_speed, fuel_level, shutdowns, warnings, maintainance_last_date, maintainance_next_date, maintainance_time_left, maintainance_running_time, createdlocal_db, updatedlocal_db
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