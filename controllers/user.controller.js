const userModel = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get user by ID
const getUser = async (req, res) => {
	try {
		const { id } = req.params; // Get the user ID from request params

		// Fetch user by ID, excluding sensitive fields like password
		const fetchedUser = await userModel.findById(id).select("-password");

		if (!fetchedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(fetchedUser);
	} catch (err) {
		console.error("Error fetching user:", err); // Log error for debugging
		res.status(500).json({ error: "Failed to retrieve user" });
	}
};

// Delete user
const deleteUser = async (req, res) => {
	try {
		const { userId } = req.user; // User ID from JWT payload

		const removedUser = await userModel.findByIdAndDelete(userId);

		if (!removedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Clear the user token cookie securely
		res.clearCookie("user_token", { httpOnly: true, sameSite: "strict" });

		res.status(200).json({
			message: "User successfully deleted",
			user: removedUser,
		});
	} catch (err) {
		console.error("Error deleting user:", err); // Log error for debugging
		res.status(500).json({ error: "Failed to delete user" });
	}
};

// Update user information
const updateUserInfo = async (req, res) => {
	const updateFields = req.body; // Get fields to update from the request body
	const { userId } = req.user; // User ID from JWT

	try {
		// Ensure there are fields to update
		if (Object.keys(updateFields).length === 0) {
			return res.status(400).json({ error: "No fields to update" });
		}

		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			updateFields,
			{ new: true, runValidators: true } // Validate updates
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			message: "User information updated successfully",
			user: updatedUser,
		});
	} catch (err) {
		console.error("Error updating user info:", err); // Log error for debugging
		res.status(500).json({ error: "Cannot update user info" });
	}
};

// Update user password
const updatePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const { userId } = req.user;

	try {
		const user = await userModel.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Compare the old password with the hashed password in the database
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Old password does not match" });
		}

		if (oldPassword === newPassword) {
			return res.status(400).json({
				message: "New password cannot be the same as the old one",
			});
		}

		// Hash the new password before saving it
		const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Using async hash for better practice

		await userModel.findByIdAndUpdate(
			userId,
			{ password: hashedNewPassword },
			{ new: true }
		);
		res.status(200).json({ message: "Password successfully updated" });
	} catch (err) {
		console.error("Error updating password:", err); // Log error for debugging
		res.status(500).json({ error: "Cannot update password" });
	}
};

// Update user role
const updateRole = async (req, res) => {
	const { id, newRole } = req.body; // Get the user ID and the new role from the request body
	const { role } = req.user; // Get the role from the JWT

	// Check if the user has permission to update roles
	if (!["SuperAdmin", "Admin"].includes(role)) {
		return res.status(403).json({
			message: "You don't have permission to update user roles",
		});
	}

	try {
		const updatedUser = await userModel.findByIdAndUpdate(
			id,
			{ role: newRole },
			{ new: true, runValidators: true } // Validate updates
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			message: "User role updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user role:", error); // Log error for debugging
		res.status(500).json({ error: "Failed to update user role" });
	}
};

module.exports = {
	getUser,
	deleteUser,
	updateUserInfo,
	updatePassword,
	updateRole,
};
