// Makes use of the controller to route to the necessary function
const express = require("express")
const blogPostController = require("../controllers/blogPostController")
const protect = require("../middleware/usersMiddleware")

const router = express.Router()

// localhost:8000/api/v1/
router.route("/").get(protect, blogPostController.getAllBlogPosts).post(protect, blogPostController.createBlogPost)

// localhost:8000/api/v1/id
router.route("/:id").get(protect, blogPostController.findBlogPost).patch(protect, blogPostController.updatePost).delete(protect, blogPostController.deletePost)

module.exports = router