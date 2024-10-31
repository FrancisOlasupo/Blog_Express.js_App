const mongoose = require("mongoose");

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		trim: true, // Remove whitespace from both ends
		minlength: 1, // Minimum length for comment to prevent empty comments
		maxlength: 500, // Maximum length to keep comments concise
	},

	// ID of the related post
	postId: {
		type: mongoose.Schema.Types.ObjectId, // Reference to the related post
		ref: "Post", // Ensure this field references the Post model
		required: true,
	},

	// ID of the user who made the comment
	commentorId: {
		type: mongoose.Schema.Types.ObjectId, // Reference to the user who commented
		ref: "User", // Ensure this field references the User model
		required: true,
	},

	// Array of user IDs who liked the comment
	likes: {
		type: [mongoose.Schema.Types.ObjectId], // Use ObjectId to reference User model
		ref: "User", // Ensure this field references the User model
		default: [], // Default to an empty array
	},

	// Date the comment was created
	createdAt: {
		type: Date,
		default: Date.now, // Automatically set to the current date and time
	},
});

// Create index for efficient querying based on created date
commentSchema.index({ createdAt: -1 }); // Indexing for faster retrieval of comments by date

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment; // Export the Comment model for use in other parts of the application
