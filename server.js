const express = require('express');
//const routes = require('./controllers');
//const path = require('path');
//const exphbs = require('express-handlebars');
//const session = require('express-session');
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});