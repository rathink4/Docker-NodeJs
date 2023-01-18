const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')
const app = express()
app.use(express.json())

const blogPostRouter = require('./routers/blogPostRoutes')
const usersRouter = require('./routers/usersRoutes')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// TRY-CATCH in case mongodb is down and docker tries to spin up the container tyring to connect
const connectRetry = () => {
    mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
        console.log(e)
        // if mongoose can't connect, then wait 5 secs and then try again. Goes for infinity.
        // Not the best way to approach it but whatever, I tried solving this edge case.
        setTimeout(connectRetry(), 5000)
    })
}

// Use the function to make sure the logic is getting used
connectRetry()


app.get("/", (req, res) => {
    res.send("<h1>Let's get started!!</h1>")
})

// If you try to hit localhost:8000/api/v1/posts, then it will use the routes in blogPostRouter
app.use("/api/v1/posts", blogPostRouter)
app.use("/api/v1/signUp", usersRouter)
app.use("/api/v1/login", usersRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening at port : ${port}`))