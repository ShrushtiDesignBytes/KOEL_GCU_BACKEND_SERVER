var db = require('../../config/db');
const System = db.system;
const moment = require('moment-timezone');
const sequelize = db.sequelize;

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format();
}

module.exports = {

    //get all system
    getSystem: async (req, res) => {
        try {
            const system = await System.findAll();
            const datawithIST = system.map(record => {
                return {
                    ...record.dataValues,
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
            });
            return res.status(200).send(
                // system
                datawithIST
            );

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add system
    createSystem: async (req, res) => {
        const systemArray = req.body;

        try {
            const createdSystem = await Promise.all(
                systemArray.map((async (systemData) => {

                    const { g_hardware_V, g_hardware_P, g_hardware_S, g_software_V, g_software_P, g_software_S, h_hardware_V, h_hardware_P, h_hardware_S, h_software_V, h_software_P, h_software_S, createdlocal_db, updatedlocal_db } = systemData;

                    const [result, metadata] = await sequelize.query(`
                        CALL unique_system_info(
                           :v_g_hardware_V, :v_g_hardware_S, :v_g_hardware_P,
                           :v_g_software_V, :v_g_software_S, :v_g_software_P,
                           :v_h_hardware_V, :v_h_hardware_S, :v_h_hardware_P,
                           :v_h_software_V, :v_h_software_S, :v_h_software_P,
                           :v_createdlocal_db::timestamptz, :v_updatedlocal_db::timestamptz, :result_json
               );
                   `, {
                       replacements: {
                           v_g_hardware_V: g_hardware_V,
                           v_g_hardware_S: g_hardware_S,
                           v_g_hardware_P: g_hardware_P,
                           v_g_software_V: g_software_V,
                           v_g_software_S: g_software_S,
                           v_g_software_P: g_software_P,
                           v_h_hardware_V: h_hardware_V,
                           v_h_hardware_S: h_hardware_S,
                           v_h_hardware_P: h_hardware_P,
                           v_h_software_V: h_software_V,
                           v_h_software_S: h_software_S,
                           v_h_software_P: h_software_P,
                           v_createdlocal_db: createdlocal_db,
                           v_updatedlocal_db: updatedlocal_db,
                           result_json: null
                       },
                       type: sequelize.QueryTypes.RAW
                   });
       
                   const system = result[0].result_json;
       
                   const datawithIST = system && {
                       ...system,
                       createdlocal_db: convertToIST(system.createdlocal_db),
                       updatedlocal_db: convertToIST(system.updatedlocal_db),
                       createdAt: convertToIST(system.createdAt),
                       updatedAt: convertToIST(system.updatedAt),
                   }
       
                   const data = system === null ? 'Already saved same data in database' : datawithIST;
                   return data;

                }))
            )         

            return res.status(200).send(createdSystem);

        } catch (error) {
            console.log(error)
            return res.status(400).json(
                error.message
            );
        }
    },

    //view system by id
    viewSystem: async (req, res) => {
        const id = req.params.id
        try {
            const system = await System.findByPk(id);
            return res.status(200).send(
                system
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete system by id
    deleteSystem: async (req, res) => {
        const id = req.params.id;
        try {
            const system = await System.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //system update by id
    updateSystem: async (req, res) => {
        const id = req.params.id;
        const { g_hardware_V, g_hardware_P, g_hardware_S, g_software_V, g_software_P, g_software_S, h_hardware_V, h_hardware_P, h_hardware_S, h_software_V, h_software_P, h_software_S, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const ids = await System.findByPk(id);

            if (ids) {
                const system = await System.update({
                    g_hardware_V, g_hardware_P, g_hardware_S, g_software_V, g_software_P, g_software_S, h_hardware_V, h_hardware_P, h_hardware_S, h_software_V, h_software_P, h_software_S, createdlocal_db, updatedlocal_db
                },
                    {
                        where: { id }
                    });
                const data = await System.findByPk(id);
                return res.status(200).send({
                    message: 'Updated Successfully',
                    data: data
                });
            } else {
                return res.status(400).send({
                    message: 'Id is not found'
                });
            }

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    }
}