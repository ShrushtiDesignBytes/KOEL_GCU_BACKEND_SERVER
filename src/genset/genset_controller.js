var db = require('../../config/db');
const Genset = db.genset;
const sequelize = db.sequelize;
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

        const gensetArray = req.body;

        try {
            const createdGenset = []
            for (const gensetData of gensetArray) {
                    const { avg_voltage_pn, avg_voltage_pp, avg_power_kva, avg_power_pw, frequency, power_factor, total_working_capacity, running_time, fuel_level, loads, coolant_temp, engine_speed, alternator_voltage, lube_oil_pressure, alternator_current, battery_voltage, shutdowns, warnings, createdlocal_db, updatedlocal_db } = gensetData;

                    try {
                        const [result, metadata] = await sequelize.query(`
                            CALL unique_genset(
                                :v_avg_voltage_pn, :v_avg_voltage_pp, :v_avg_power_kva, :v_avg_power_pw, :v_frequency, :v_power_factor::numeric,
                                :v_total_working_capacity, :v_running_time, :v_fuel_level, :v_loads, :v_coolant_temp::numeric, :v_engine_speed,
                                :v_alternator_voltage, :v_lube_oil_pressure::numeric, :v_alternator_current, :v_battery_voltage::numeric, 
                                :v_shutdowns, :v_warnings,
                                :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz, :result_json
                            )
                        `, {
                            replacements: {
                                v_avg_voltage_pn: avg_voltage_pn,
                                v_avg_voltage_pp: avg_voltage_pp,
                                v_avg_power_kva: avg_power_kva,
                                v_avg_power_pw: avg_power_pw,
                                v_frequency: frequency,
                                v_power_factor: power_factor,
                                v_total_working_capacity: total_working_capacity,
                                v_running_time: running_time,
                                v_fuel_level: fuel_level,
                                v_loads: loads,
                                v_coolant_temp: coolant_temp,
                                v_engine_speed: engine_speed,
                                v_alternator_voltage: alternator_voltage,
                                v_lube_oil_pressure: lube_oil_pressure,
                                v_alternator_current: alternator_current,
                                v_battery_voltage: battery_voltage,
                                v_shutdowns: shutdowns,
                                v_warnings: warnings,
                                v_createdlocal_db: createdlocal_db,
                                v_updatedlocal_db: updatedlocal_db,
                                result_json: null
                            },
                            type: sequelize.QueryTypes.RAW
                        });
    
                        const genset = result[0].result_json;
    
                        const datawithIST = await genset && {
                            ...genset,
                            createdlocal_db: convertToIST(genset.createdlocal_db),
                            updatedlocal_db: convertToIST(genset.updatedlocal_db),
                            createdAt: convertToIST(genset.createdAt),
                            updatedAt: convertToIST(genset.updatedAt),
                        };
    
                        const data = genset === null ? 'Already saved same data in database' : datawithIST;
                        createdGenset.push(data);
                        
                    } catch (innerError) {
                        createdGenset.push({ error: `Failed to process data for genset: ${innerError.message}` });
                    }
                    
                }            

            return res.status(200).send(createdGenset);

        } catch (error) {
            console.log(error)
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