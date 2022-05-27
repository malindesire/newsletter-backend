const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/newsletter", {}, (err) => {
    const db = mongoose.connection
    app.locals.db = db;
    if(err) {
        console.log(err);
    } else {
        console.log("Du är uppkopplad mot databasen!");
    }
});

// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("mongodb://127.0.0.1:27017", {
//     useUnifiedTopology: true
// })
// .then(client => {
//     console.log("Du är uppkopplad mot databasen!");

//     const db = client.db("newsletter");
//     app.locals.db = db;
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app;
