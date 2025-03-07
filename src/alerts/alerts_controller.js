var db = require('../../config/db');
const Alerts = db.alerts;
const moment = require('moment-timezone');
const sequelize = db.sequelize;

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format('DD MMM YY h:mm A');
}


module.exports = {

    //get all alerts
    getAlerts: async (req, res) => {
        try {
            const alerts = await Alerts.findAll();

            const datawithIST = alerts.map(record => {
                return {
                    ...record.dataValues,
                    date: convertToIST(record.date),
                    resolved: convertToIST(record.resolved),
                    createdlocal_db: convertToIST(record.createdlocal_db),
                    updatedlocal_db: convertToIST(record.updatedlocal_db),
                    createdAt: convertToIST(record.createdAt),
                    updatedAt: convertToIST(record.updatedAt),
                }
            });

            // const datawithIST = {
            //         ...alerts.dataValues,
            //         date: convertToIST(alerts.date),
            //         resolved: convertToIST(alerts.resolved),
            //     }

            return res.status(200).send(
                //alerts
                datawithIST
            );

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add alerts
    createAlerts: async (req, res) => {
        const alertsArray = req.body;

        try {
            const createdAlert = []
            for (const alertData of alertsArray) {
                const { faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db } = alertData;

                try {
                    const [result, metadata] = await sequelize.query(
                        `CALL public.unique_alert(
                                :v_faultcode, 
                                :v_faulttype, 
                                :v_alertcategory, 
                                :v_date::timestamptz, 
                                :v_resolved::timestamptz, 
                                :v_status, 
                                :v_imagetype, 
                                :v_details, 
                                :v_additionalinfo, 
                                :v_createdlocal_db::timestamptz, 
                                :v_updatedlocal_db::timestamptz, 
                                :result_json
                            )`,
                        {
                            replacements: {
                                v_faultcode: faultCode,
                                v_faulttype: faultType,
                                v_alertcategory: alertCategory,
                                v_date: date,
                                v_resolved: resolved,
                                v_status: status,
                                v_imagetype: imageType,
                                v_details: details,
                                v_additionalinfo: JSON.stringify(additionalInfo),
                                v_createdlocal_db: createdlocal_db,
                                v_updatedlocal_db: updatedlocal_db,
                                result_json: null
                            },
                            type: sequelize.QueryTypes.RAW,
                        }
                    );
                    const alerts = result[0]?.result_json;

                    const datawithIST = await alerts && {
                        ...alerts,
                        date: convertToIST(alerts.date),
                        resolved: convertToIST(alerts.resolved),
                        createdlocal_db: convertToIST(alerts.createdlocal_db),
                        updatedlocal_db: convertToIST(alerts.updatedlocal_db),
                        createdAt: convertToIST(alerts.createdAt),
                        updatedAt: convertToIST(alerts.updatedAt),
                    }

                    const data = alerts === null ? 'Already saved same data in database' : datawithIST;
                    createdAlert.push(data);
                } catch (innerError) {
                    createdAlert.push({ error: `Failed to process data for genset: ${innerError.message}` });
                }

            }

            return res.status(200).send(createdAlert);

        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view alerts by id
    viewAlerts: async (req, res) => {
        const id = req.params.id
        try {
            const alerts = await Alerts.findByPk(id);
            const datawithIST = {
                ...alerts.dataValues,
                date: convertToIST(alerts.date),
                resolved: convertToIST(alerts.resolved),
            }

            return res.status(200).send(
                // alerts
                datawithIST
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete alerts by id
    deleteAlerts: async (req, res) => {
        const id = req.params.id;
        try {
            const alerts = await Alerts.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //alerts update by id
    updateAlerts: async (req, res) => {
        const id = req.params.id;
        const { faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db } = req.body;

        try {
            const alerts = await Alerts.update({
                faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db
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