const fs = require("fs");
const path = require("path");
const express = require("express");
const dataRoutes = require("./routes/dataRoutes");

//Create express app
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const data = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/test.json`)
);

//////////////////
// MIDDLEWARE'S //
//////////////////

//Middleware for made req.body available on express
app.use(express.json());

//Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

//Routes for HTTP requests
app.use("/api/v1/data", dataRoutes);

app.get("/", (req, res) => {
    res.status(200).render("base");
});

app.all("*", (req, res, next) => {
    res.status(404).json({
        message: `La dirección ${req.originalUrl} no pudo ser encontrada en este servidor`
    });
});

//Start server
module.exports = app;