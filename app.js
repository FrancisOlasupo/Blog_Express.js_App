const express = require("express");
const dotenv = require("dotenv").config();
// configuring dotenv
dotenv.config();
const mongoose = require("mongoose");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/errorHandler");
const inputValidation = require("./middlewares/inputValidation");
const app = express();
const port = process.env.PORT || 5000;

// Import routes
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const commentRouter = require("./routes/comment.route");

// Connect to MongoDB using Mongoose
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true, // Use the new URL parser
		useUnifiedTopology: true, // Use the new server discovery and monitoring engine
	})
	.then(() => console.log("Mongoose is connected")) // Log success message
	.catch((err) => console.error("Error connecting to MongoDB:", err)); // Log error message on failure

app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Use cookie-parser middleware to handle cookies

// Use imported routes
app.use(userRoute);
app.use(postRoute);
app.use(commentRouter);
app.use(authRoute);

// Start the server
app.listen(port, () => {
	console.log(`App is running on port ${port}`); // Log the port the app is running on
});
