const { body } = require("express-validator");

/**
 * Input Validation middleware using express-validator.
 * Validates and sanitizes user inputs for registration.
 */
const registerValidation = [
	body("email").isEmail().normalizeEmail(),
	body("password").isLength({ min: 5 }).trim().escape(),
];

module.exports = {
	registerValidation,
};
