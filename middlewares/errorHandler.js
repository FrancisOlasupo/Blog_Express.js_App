/**
 * Error handling middleware to manage errors centrally.
 * Logs errors and sends a response with error details.
 */
const errorHandler = (err, req, res, next) => {
	console.error(err.stack); // Log the error stack for debugging
	res.status(err.status || 500).json({
		error: {
			message: err.message,
		},
	});
};

module.exports = errorHandler;
