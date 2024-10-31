const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Import validation middleware
const {
	makePost,
	getAllPost,
	getPost,
	deletePost,
	updatePost,
	likePost,
} = require("../controllers/post.controller");

const { auth } = require("../middlewares/auth.middleware");

router.post("/new-post", auth, makePost);
router.get("/allpost", getAllPost);
router.get("/getpost/:id", getPost);
router.put("/editpost/:id", auth, updatePost);
router.delete("/deletepost", auth, deletePost);
router.post("/postlike/:id", auth, likePost);

module.exports = router;
