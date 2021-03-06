const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');

const app = express();
//const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'This is a secret',
    cookie: {maxAge: 7200000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    //app.listen(PORT, () => console.log('Now Listening'));
    app.listen(process.env.PORT || 3001, function () {
        console.log('Now listening');
    })
});

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');