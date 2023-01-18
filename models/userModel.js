const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Blogger requires a username for account :/"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Blogger requires a password for account :/"],
    }
})

const user = mongoose.model("user", userSchema)
module.exports = user