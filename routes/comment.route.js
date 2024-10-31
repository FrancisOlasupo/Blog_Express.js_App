const express = require("express");
const router = express.Router();

const {
	postComment,
	editComment,
	likeComment,
	deleteComment,
	getComments,
} = require("../controllers/comment");

// Importing verification middleware
const { auth } = require("../middlewares/auth.middleware");

router.post("/posts/:postId/comments", auth, postComment); // Requires authentication

router.put("/comments/:commentId", auth, editComment); // Requires authentication

router.patch("/comments/:commentId/like", auth, likeComment); // Requires authentication

router.delete("/comments/:commentId", auth, deleteComment); // Requires authentication

router.get("/posts/:postId/comments", getComments); // No verification needed

module.exports = router;
