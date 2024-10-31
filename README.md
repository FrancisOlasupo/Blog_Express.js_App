# Blog Express.js App

## Overview

Welcome to the **Blog Express.js App**, a robust backend application designed for managing blog posts, built using Express.js. This application provides a RESTful API for creating, reading, updating, and deleting blog content, and it’s fully tested using Postman.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [API Endpoints](#api-endpoints)
-   [Testing with Postman](#testing-with-postman)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Introduction

This project is a capstone project developed by **Francis Oluwatosin Olasupo** as part of my coursework at **Axia Africa Nigeria**. The Blog Express.js App demonstrates my skills in backend development, RESTful API design, and database management using MongoDB.

## Features

-   **User Authentication**: Secure login and registration endpoints.
-   **CRUD Operations**: Full support for creating, reading, updating, and deleting blog posts.
-   **Category Management**: Organize posts into categories for better navigation.
-   **Commenting System**: Enable users to comment on blog posts.
-   **Search Functionality**: Filter posts based on keywords.

## Technologies Used

-   **Node.js**: JavaScript runtime for building the server and handling asynchronous operations.
-   **Express.js**: Web framework for building RESTful APIs, providing robust features for web and mobile applications.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB, simplifying data interaction and schema validation.
-   **MongoDB**: NoSQL database for storing and managing blog data, enabling flexible and scalable data structures.
-   **bcryptjs**: Library for hashing passwords, enhancing security by storing password hashes instead of plain text.
-   **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for secure authentication and authorization.
-   **dotenv**: Module for managing environment variables, keeping sensitive configuration details secure and separate from code.
-   **body-parser**: Middleware for parsing incoming request bodies, making it easier to work with JSON data.
-   **cookie-parser**: Middleware for parsing cookies attached to the client request object, useful for session management.
-   **express-validator**: Middleware for validating and sanitizing incoming data, ensuring data integrity and security.
-   **nodemon**: Development tool that automatically restarts the server when file changes are detected, enhancing the development workflow.
-   **passport**: Middleware for implementing authentication strategies, enabling user login and registration.
-   **passport-google-oauth20**: Passport strategy for authenticating users using Google OAuth 2.0, allowing for easy login via Google accounts.

## API Endpoints

The following API endpoints are available in the application:

-   **User Registration**
    -   `POST /api/auth/register`: Register a new user.
-   **User Login**

    -   `POST /api/auth/login`: Authenticate a user.

-   **Get All Posts**

    -   `GET /api/posts`: Retrieve all blog posts.

-   **Create a Post**

    -   `POST /api/posts`: Create a new blog post.

-   **Update a Post**

    -   `PUT /api/posts/:id`: Update an existing blog post.

-   **Delete a Post**
    -   `DELETE /api/posts/:id`: Delete a blog post.

## Testing with Postman

Instructions on how to test the API using Postman.

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your branch.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries, please reach out:

-   **Francis Oluwatosin Olasupo**
-   **Email**: olasupofrancis90@gmail.com
