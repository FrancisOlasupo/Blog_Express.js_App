const mongoose = require("mongoose");
const validator = require("validator"); // Library for validating data
const bcrypt = require("bcryptjs"); // Library for hashing passwords

// User schema definition
const userSchema = new mongoose.Schema(
	{
		// Unique username for the user
		userName: {
			type: String,
			required: true, // This field is mandatory
			trim: true, // Remove whitespace from both ends
			unique: true, // Ensure username is unique in the database
			minlength: 3, // Minimum length for username
			maxlength: 30, // Maximum length for username
		},

		// User password
		password: {
			type: String,
			required: function () {
				return !this.credentialAccount; // Password required if not using a credential account
			},
			trim: true, // Remove whitespace
			minlength: 8, // Minimum length for password for security
		},

		// User's email address
		email: {
			type: String,
			required: true, // This field is mandatory
			unique: true, // Ensure email is unique in the database
			trim: true, // Remove whitespace
			lowercase: true, // Convert email to lowercase for consistency
			validate: {
				validator: validator.isEmail, // Validate email format using the validator library
				message: "Invalid email format", // Error message for invalid email
			},
		},

		// Boolean flag indicating if the user is using a credential account
		credentialAccount: {
			type: Boolean,
			default: false, // Default value is false
		},

		// User's gender
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"], // Limited to specified values
			required: function () {
				return !this.credentialAccount; // Gender required if not using a credential account
			},
		},

		// User's age
		age: {
			type: Number,
			min: 0, // Ensure age is a positive number
			required: function () {
				return !this.credentialAccount; // Age required if not using a credential account
			},
		},

		// User's role within the application
		role: {
			type: String,
			enum: ["User", "Admin", "SuperAdmin"], // Limited to specified roles
			default: "User", // Default role is User
		},

		// Optional field for user's profile picture
		profilePicture: {
			type: String, // URL or path to the profile picture
			trim: true, // Remove whitespace
		},

		// Optional field for user biography
		bio: {
			type: String,
			maxlength: 250, // Maximum length for bio
		},
	},
	{ timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
	if (this.isModified("password") || this.isNew) {
		const salt = await bcrypt.genSalt(10); // Generate salt for hashing
		this.password = await bcrypt.hash(this.password, salt); // Hash the password
	}
	next(); // Proceed to save the user
});

// Method to compare plaintext password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password); // Return comparison result
};

// Indexing for faster queries based on creation date
userSchema.index({ createdAt: -1 });

const userModel = mongoose.model("User", userSchema); // Create User model from schema
module.exports = userModel; // Export the User model
