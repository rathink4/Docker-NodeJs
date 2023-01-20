const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config')
const app = express()

// Adding Redis to the app. Creating Redis Store and client
let RedisStore = connectRedis(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: SESSION_SECRET,
    cookie:{
        secure: false,
        resave: false,
        saveUnintialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

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
app.use("/api/v1/users", usersRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening at port : ${port}`))