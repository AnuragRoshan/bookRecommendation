const express = require('express');
const app = express();
const passport = require("passport");
const routes = require("./Api/Routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")

dotenv.config();

app.use(express.json());

require("./db_connection");//connect to database

app.use(routes); //routes


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);



app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port 5000...');
});