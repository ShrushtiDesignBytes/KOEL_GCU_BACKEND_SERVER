var db = require('../../config/db');
const Alternator = db.alternator;
const moment = require('moment-timezone');
const sequelize = db.sequelize;


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
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
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
        const alternatorArray = req.body;
 
        try {
            const createdAlternator = await Promise.all(
                alternatorArray.map((async (alternatorData) => { 
                    const { alternator_voltage, alternator_current, power_factor, kilowatt_hour,frequency,avg_kw,avg_kva,avg_kvar,voltage,apparent_power,energy_chart,active_power,reactive_power,current, power_factor_ryb, createdlocal_db, updatedlocal_db } = alternatorData;
                    const [result, metadata] = await sequelize.query(
                        `CALL unique_alternator(:v_alternator_voltage, :v_alternator_current, :v_power_factor,
                         :v_kilowatt_hour, :v_frequency, :v_avg_kw, :v_avg_kva, :v_avg_kvar,
                         :v_voltage, :v_apparent_power, :v_energy_chart, :v_active_power,
                         :v_reactive_power, :v_current, :v_power_factor_ryb, :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz, :result_json
                         )`,
                        {
                            replacements: {
                                v_alternator_voltage: alternator_voltage,
                                v_alternator_current: alternator_current,
                                v_power_factor: power_factor,
                                v_kilowatt_hour: kilowatt_hour,
                                v_frequency: frequency,
                                v_avg_kw: avg_kw,
                                v_avg_kva: avg_kva,
                                v_avg_kvar: avg_kvar,
                                v_voltage: JSON.stringify(voltage),
                                v_apparent_power: JSON.stringify(apparent_power),
                                v_energy_chart: JSON.stringify(energy_chart),
                                v_active_power: JSON.stringify(active_power),
                                v_reactive_power: JSON.stringify(reactive_power),
                                v_current: JSON.stringify(current),
                                v_power_factor_ryb: JSON.stringify(power_factor_ryb),
                                v_createdlocal_db: createdlocal_db,
                                v_updatedlocal_db: updatedlocal_db,
                                result_json: null // Placeholder for OUT parameter
                            },
                            type: sequelize.QueryTypes.RAW, // Use RAW to execute stored procedures
                        }
                    );
        
                    const alternator = result[0].result_json;
        
                    const datawithIST = await alternator && {
                            ...alternator,
                            createdlocal_db: convertToIST(alternator.createdlocal_db),
                            updatedlocal_db: convertToIST(alternator.updatedlocal_db),
                            createdAt: convertToIST(alternator.createdAt),
                            updatedAt: convertToIST(alternator.updatedAt),
                        }
                    
                        const data = alternator === null ? 'Already saved same data in database' : datawithIST;
                        return data;
                }))
            )   
            
            return res.status(200).send(createdAlternator);
                
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