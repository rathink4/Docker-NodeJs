const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose
    .connect("mongodb://rathink4:mongodb_pass3@mongodb:27017/?authSource=admin")
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => console.log(e))

app.get("/", (req, res) => {
    res.send("<h1>Let's get started!!</h1>")
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening at port : ${port}`))