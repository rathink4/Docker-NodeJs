// Makes use of the controller to route to the necessary function
const express = require("express")
const blogPostController = require("../controllers/blogPostController")
const protect = require("../middleware/usersMiddleware")

const router = express.Router()

// localhost:8000/api/v1/
router.route("/").get(blogPostController.getAllBlogPosts).post(protect, blogPostController.createBlogPost)

// localhost:8000/api/v1/id
router.route("/:id").get(blogPostController.findBlogPost).patch(blogPostController.updatePost).delete(blogPostController.deletePost)

module.exports = router