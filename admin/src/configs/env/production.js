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
    app.set('port', 80);
    app.set('host', '127.0.0.1');
    app.set('views', path.join(__dirname, './../../../dist/views'));
    app.set('view engine', 'hbs');
    app.set('assets', path.join(__dirname, './../../../build'));
    /*
        middlewares
     */
    app.use(express.static(app.get('assets')));
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
        limit: '200kb',
        defaultCharset: 'utf-8'
    }));
    app.use(methodOverride('_method'));
    app.use(expressSession({
        secret: 'Bl2RNuGxqIGY9cG55b5gJBMnzH8OfZRx',
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