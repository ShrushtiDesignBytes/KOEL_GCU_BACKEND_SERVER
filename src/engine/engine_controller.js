var db = require('../../config/db');
const moment = require('moment-timezone');
const sequelize = db.sequelize;

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
            const datawithIST = engine.map(record => {
                return {
                    ...record.dataValues,
                    maintainance_last_date: convert_Maintaince_date(record.maintainance_last_date),
                    maintainance_next_date: convert_Maintaince_date(record.maintainance_next_date),
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
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
        const engineArray = req.body;
        
        try {
            const createdEngine = await Promise.all(
                engineArray.map((async (engineData) => {
                    const { running_time, engine_speed, battery_voltage, lube_oil_pressure, coolant_temperature, canopy_temperature, fuel_temperature, exhaust_temperature, lube_oil_temperature, manifold_temperature, manifold_pressure, turbo_speed, fuel_level, shutdowns, warnings, maintainance_last_date, maintainance_next_date, maintainance_time_left, maintainance_running_time, createdlocal_db, updatedlocal_db } = engineData;

                    const [result, metadata] = await sequelize.query(`
                        CALL unique_engine(
                            :v_running_time, :v_engine_speed, :v_battery_voltage, :v_lube_oil_pressure, :v_coolant_temperature, :v_canopy_temperature, :v_fuel_temperature, :v_exhaust_temperature, :v_lube_oil_temperature, :v_manifold_temperature, :v_manifold_pressure, :v_turbo_speed, :v_fuel_level, :v_shutdowns, :v_warnings, :v_maintainance_last_date::timestamp, :v_maintainance_next_date::timestamp, :v_maintainance_time_left, :v_maintainance_running_time, :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz,
                            :result_json
                        )
                    `,{
                        replacements: {
                            v_running_time: running_time,
                            v_engine_speed: engine_speed,
                            v_battery_voltage: battery_voltage,
                            v_lube_oil_pressure: lube_oil_pressure,
                            v_coolant_temperature: coolant_temperature,
                            v_canopy_temperature: canopy_temperature,
                            v_fuel_temperature: fuel_temperature,
                            v_exhaust_temperature: exhaust_temperature,
                            v_lube_oil_temperature: lube_oil_temperature,
                            v_manifold_temperature: manifold_temperature,
                            v_manifold_pressure: manifold_pressure,
                            v_turbo_speed: turbo_speed,
                            v_fuel_level: fuel_level,
                            v_shutdowns: shutdowns,
                            v_warnings: warnings,
                            v_maintainance_last_date: maintainance_last_date,
                            v_maintainance_next_date: maintainance_next_date,
                            v_maintainance_time_left: maintainance_time_left,
                            v_maintainance_running_time: maintainance_running_time,
                            v_createdlocal_db: createdlocal_db,
                            v_updatedlocal_db: updatedlocal_db,
                            result_json: null
                        },
                        type: sequelize.QueryTypes.RAW
                    });
        
                    const engine = result[0].result_json;
        
                    const datawithIST = await engine && {
                        ...engine,
                        maintainance_last_date: convertToIST(engine.maintainance_last_date),
                        maintainance_next_date: convertToIST(engine.maintainance_next_date),
                        createdlocal_db: convertToIST(engine.createdlocal_db),
                        updatedlocal_db: convertToIST(engine.updatedlocal_db),
                        createdAt: convertToIST(engine.createdAt),
                        updatedAt: convertToIST(engine.updatedAt),
                    }
                    const data = engine === null ? 'Already saved same data in database' : datawithIST;
                    return data;
                }))
            )

            return res.status(200).send(createdEngine);

        } catch (error) {
            console.log(error)
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
            if (engineId === null) {
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