const express = require('express');
const app = express();
const routes = require("./Api/Routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const morgan = require("morgan");
const cookieParser = require('cookie-parser');



app.use(morgan("dev"));

dotenv.config();


require("./db_connection");//connect to database



// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(cookieParser())





app.use(routes); //routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port 5000...');
});