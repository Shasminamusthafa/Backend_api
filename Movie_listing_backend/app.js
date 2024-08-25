require("dotenv").config();

const movieRoutes = require ("./routes/movies/movies");
const db = require("./db/index");
const express = require("express");
const app = new express();

db();

const port = process.env.PORT || 8880;

app.use(express.json());

app.use("/movies",movieRoutes);

app.listen(port,()=>{
    console.log(`Listen to http://localhost:${port}`);
});

