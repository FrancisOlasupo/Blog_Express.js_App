const express = require("express");
const route = express.Router();
const {
	getUser,
	deleteUser,
	updateUserInfo,
	updatePassword,
	updateRole,
} = require("../controllers/users");

const { auth } = require("../middlewares/auth.middleware");

route.get("/users/:id", getUser);
route.delete("/user/delete", auth, deleteUser);
route.put("/update", auth, updateUserInfo);
route.put("/password", auth, updatePassword);
route.put("/change-role", auth, updateRole);

module.exports = route; // Export the router for use in other parts of the application
