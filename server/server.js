const express = require('express');
const app = express();
const passport = require("passport");
const routes = require("./Api/Routes/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const morgan = require("morgan");
const session = require("express-session");


app.use(morgan("dev"));

dotenv.config();

app.use(express.json());

require("./db_connection");//connect to database



// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, prioroty: "High" }
    })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);


app.use(routes); //routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port 5000...');
});