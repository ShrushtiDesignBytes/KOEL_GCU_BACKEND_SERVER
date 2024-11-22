var db = require('../../config/db');
const Mains = db.mains;
const sequelize = db.sequelize;
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
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
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

        const mainsArray = req.body;

        try {
            const createdMains = await Promise.all(
                mainsArray.map((async (mainsData) => { 
                    const { main_voltage_ry, main_voltage_yb, main_voltage_rb, frequency, phase_angle, createdlocal_db, updatedlocal_db } = mainsData;

                    const [result, metadata] = await sequelize.query(`
                        CALL unique_mains(
                            :v_main_voltage_ry, :v_main_voltage_yb, :v_main_voltage_rb, :v_frequency, :v_phase_angle,
                            :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz, :result_json
                        )
                    `, {
                        replacements: {
                            v_main_voltage_ry: main_voltage_ry,
                            v_main_voltage_yb: main_voltage_yb,
                            v_main_voltage_rb: main_voltage_rb,
                            v_phase_angle: phase_angle,
                            v_frequency: frequency,
                            v_createdlocal_db: createdlocal_db,
                            v_updatedlocal_db: updatedlocal_db,
                            result_json: null
                        },
                        type: sequelize.QueryTypes.RAW
                    });
        
                    const mains = result[0].result_json;
        
                    const datawithIST = await mains && {
                        ...mains,
                        createdlocal_db: convertToIST(mains.createdlocal_db),
                        updatedlocal_db: convertToIST(mains.updatedlocal_db),
                        createdAt: convertToIST(mains.createdAt),
                        updatedAt: convertToIST(mains.updatedAt),
                    }
        
                    const data = mains === null ? 'Already saved same data in database' : datawithIST;
                    return data;
                
                }))
            )
           
            return res.status(200).send(createdMains);
            
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