const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const UserModel = require('./models/user.model')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();
const mongoose = require('mongoose');
const { start } = require('repl');

mongoose.connect("mongodb://localhost/newsletter", (err) => {
    const db = mongoose.connection
    app.locals.db = db;
    if(err) {
        console.log(err);
    } else {
        console.log("Du är uppkopplad mot databasen!");
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// API routing
app.get("/api/user", async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch {
        console.log(err);
        res.json(err)
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const user = await UserModel.find({_id: req.params.id})
        res.json(user)
    } catch {
        console.log(err);
        res.json(err)
    }
});

app.post("/api/user/", async (req, res) => {
    try {
        const newUser = new UserModel(req.body)
        newUser.save()
        res.json("Ny användare sparad")
    } catch {
        console.log(err);
        res.json(err)
    }

});


module.exports = app;