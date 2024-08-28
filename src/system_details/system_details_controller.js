var db = require('../../config/db');
const System = db.system;
const moment = require('moment-timezone');

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
        const { g_hardware_V, g_hardware_P, g_hardware_S, g_software_V, g_software_P, g_software_S, h_hardware_V, h_hardware_P, h_hardware_S, h_software_V, h_software_P, h_software_S, createdlocal_db, updatedlocal_db} = req.body;
        try {
            const system = await System.create({
                g_hardware_V, g_hardware_P, g_hardware_S, g_software_V, g_software_P, g_software_S, h_hardware_V, h_hardware_P, h_hardware_S, h_software_V, h_software_P, h_software_S, createdlocal_db, updatedlocal_db
            });

            // const datawithIST = {
            //         ...System.dataValues,
            //         createdAt: convertToIST(System.createdAt),
            //         updatedAt: convertToIST(System.updatedAt),
            //     }
            
            return res.status(200).send(
                system
                //datawithIST
            );
        } catch (error) {
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

            if(ids){
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