const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require("./config/db.js");
const dotenv = require('dotenv').config();

const gensetRoutes = require('./src/genset/genset_routes.js');
const engineRoutes = require('./src/engine/engine_routes.js');
const mainsRoutes = require('./src/mains/mains_routes.js');
const alternatorRoutes = require('./src/alternator/alternator_routes.js');
const alertsRoutes = require('./src/alerts/alerts_routes.js');
const systemRoutes = require('./src/system_details/system_details_routes.js');
const contactRoutes = require('./src/contact_details/contact_details_routes.js');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

app.use('/genset', gensetRoutes);
app.use('/engine', engineRoutes);
app.use('/mains', mainsRoutes);
app.use('/alternator', alternatorRoutes);
app.use('/alerts', alertsRoutes);
app.use('/contact', contactRoutes);
app.use('/system', systemRoutes);

app.get('/', (req,res) => res.send('Hello User'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));