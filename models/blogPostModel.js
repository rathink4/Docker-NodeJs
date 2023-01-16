const mongoose = require("mongoose")

const blogPostSchema = new mongoose.Scheme({
    title: {
        type: String,
        require: ["true", "Every blog post needs a title :) "],
    },
    body: {
        type: String,
        require: ["true", "Wouldn't be a post with nothing in it :/ "],
    }
})

const blogPost = mongoose.model("blogPost", blogPostSchema)
module.exports = blogPost