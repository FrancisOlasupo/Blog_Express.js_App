const express = require("express");
const route = express.Router();

// Importing controller functions
const {
	register,
	loginUser,
	logout,
	authRegister,
} = require("../controllers/auth.controller");

// Importing middleware
const { auth } = require("../middlewares/auth.middleware");

// User Authentication Routes
route.post("/register", register);
route.post("/login", loginUser);
route.post("/logout", auth, logout);
route.post("/auth", authRegister);

// User Management Routes
route.get("/user/:id", auth, getUser);
route.delete("/user", auth, deleteUser);
route.put("/user", auth, updateUserInfo);
route.put("/user/password", auth, updatePassword);
route.put("/user/role", auth, updateRole);

// Post Management Routes
route.post("/post", auth, makePost);
route.get("/posts", getAllPost);
route.get("/post/:id", getPost);
route.put("/post/:id", auth, updatePost);
route.delete("/post/:id", auth, deletePost);
route.post("/post/:id/like", auth, likePost);

// Comment Management Routes
route.post("/post/:postId/comment", auth, postComment);
route.put("/comment/:commentId", auth, editComment);
route.post("/comment/:commentId/like", auth, likeComment);
route.delete("/comment/:commentId", auth, deleteComment);
route.get("/post/:postId/comments", getComments);

module.exports = route;
