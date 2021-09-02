const express = require('express');
const app = express();  //initialize express app
require('dotenv').config(); //load environment variable from .env file
const passport = require('passport');
app.use(express.json());  //parse incomding post request body
app.use(express.urlencoded()); //parse form data
const db = require("./models/index");
require('./auth/googleStrategy')(); //initialize google strategy
db.sequelize.sync();    //sync with database
app.use(passport.initialize());
app.use(passport.session());
require("./routes/categories.routes")(app);
require("./routes/tasks.routes")(app);
require("./routes/user.routes")(app,passport);
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("listening on 3000 port");
})