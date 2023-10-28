const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config')
const app = express()

// Adding Redis to the app for handling sessions.
// Creating Redis Store for storing sessions and configuring redis by creating redis client
let RedisStore = connectRedis(session)
let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    },
    legacyMode: true
})

redisClient.connect().catch(console.error);

// Trusting proxies send by Nginx
app.enable("trust proxy")

// // Application middleware

// // Session configuration
app.use(session({
    store: new RedisStore({client:redisClient}),
    secret: SESSION_SECRET, // Sessions are usually generated using secret to access the session. This secret should be hashed as well.
    cookie:{
        secure: false, // send the cookie back if the request is https. Kept it false cause we are developing on localhost
        resave: false,
        saveUnintialized: false, // if you aren't going to write anything to the session then this makes sure you aren't caching it into redis
        httpOnly: true, // prevents client side JS to read the cookie
        maxAge: 30000
    }
}))

app.use(cors({}))
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


app.get("/api", (req, res) => {
    res.send("<h1>Let's get started change</h1>")
})

// If you try to hit localhost:8000/api/v1/posts, then it will use the routes in blogPostRouter
app.use("/api/v1/posts", blogPostRouter)
app.use("/api/v1/users", usersRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening at port : ${port}`))