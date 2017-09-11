/*
    required modules
 */
const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const hbs = require('express-hbs');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

module.exports = (app) => {
    app.set('port', 8000);
    app.set('host', '127.0.0.1');
    app.set('views', path.join(__dirname, './../../../build/views'));
    app.set('view engine', 'hbs');
    app.set('assets', path.join(__dirname, './../../../build'));
    /*
        mongo database stuff
     */
    app.set('mongo_host', '127.0.0.1');
    app.set('mongo_port', 27017);
    app.set('mongo_db', 'chat');
    app.set('mongo_url', `mongodb://${app.get('mongo_host')}:${app.get('mongo_port')}/${app.get('mongo_db')}`);
    /*
        middlewares
     */
    app.use(express.static(app.get('assets')));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride('_method'));
    app.use(expressSession({
        secret: '0YbLa5nZhrj4o6vjXa96bwdEZQjfrezX',
        resave: false,
        saveUninitialized: false
    }));
    app.use(expressValidator());

    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts')
    }));

    mongoose.Promise = global.Promise;
    mongoose.connect(app.get('mongo_url'), {
        useMongoClient: true
    });
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(require('./../../schemas/users').authenticate()));
    passport.serializeUser(require('./../../schemas/users').serializeUser());
    passport.deserializeUser(require('./../../schemas/users').deserializeUser());

    require('./../helpers')(hbs)
};