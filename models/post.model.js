const mongoose = require("mongoose"); // Import mongoose for MongoDB object modeling

// Post schema definition
const postSchema = new mongoose.Schema(
	{
		// Title of the post
		title: {
			type: String,
			required: true, // This field is mandatory
			trim: true, // Remove whitespace from both ends
			minlength: 5, // Minimum length for title for better readability
			maxlength: 100, // Maximum length for title
		},

		// Short description of the post
		desc: {
			type: String,
			required: true, // This field is mandatory
			trim: true, // Remove whitespace
			maxlength: 300, // Limit the length of the description
		},

		// Main content of the post
		content: {
			type: String,
			required: true, // This field is mandatory
			trim: true, // Remove whitespace
		},

		// ID of the creator (User)
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model
			required: true, // Ensures only authenticated users can create posts
		},

		// Array of tags for categorizing posts
		tags: {
			type: [String], // Allow multiple tags
			default: [],
			validate: {
				validator: function (v) {
					return v.length <= 10; // Limit the number of tags to 10
				},
				message: "A post can have a maximum of 10 tags.", // Error message for exceeding tag limit
			},
		},

		// URL for the preview image
		previewPix: {
			type: String,
			default: "", // Default value is an empty string
			validate: {
				validator: function (v) {
					return v === "" || /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validate URL format
				},
				message: "Invalid URL format for previewPix.", // Error message for invalid URL
			},
		},

		// URL for the detailed image
		detailPix: {
			type: String,
			default: "", // Default value is an empty string
			validate: {
				validator: function (v) {
					return v === "" || /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validate URL format
				},
				message: "Invalid URL format for detailPix.", // Error message for invalid URL
			},
		},

		// Array of user IDs who liked the post
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User", // Reference to the User model
			default: [], // Default to an empty array
		},

		// Indicates if the post is published
		published: {
			type: Boolean,
			default: false, // Default is unpublished
		},

		// Array of Comment IDs
		comment: {
			type: [mongoose.Schema.Types.ObjectId], // Store Comment IDs
			ref: "Comment", // Reference to the Comment model
			default: [], // Default to an empty array
		},
	},
	{ timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create Post model from the schema
const Post = mongoose.model("Post", postSchema); // Create and export the Post model
module.exports = Post; // Export the Post model for use in other parts of the application
