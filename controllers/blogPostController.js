// Creating the CRUD logic for the blog
const blogPost = require("../models/blogPostModel")

// get all the blog posts available
exports.getAllBlogPosts = async (req, res, next) => {
    try{
        const allPosts = await blogPost.find()
        res.status(200).json({
            status: 'Success',
            results: allPosts.length,
            data: {
                allPosts
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// find the a particular post using the id
exports.findBlogPost = async (req, res, next) => {
    try{
        const post = await blogPost.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// create a new Blog Post
exports.createBlogPost = async (req, res, next) => {
    try{
        const post = await blogPost.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// update an existing Post
exports.updatePost = async (req, res, next) => {
    try{
        const updatedPost = await blogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'Success',
            data: {
                updatedPost
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}

// delete an existing Post
exports.deletePost = async (req, res, next) => {
    try{
        const deletePost = await blogPost.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed :('
        })
    }
}