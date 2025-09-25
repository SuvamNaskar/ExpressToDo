# ExpressToDo

A simple ToDo application built with Express.js, featuring JWT-based user authentication.

## Features

*   User registration and authentication using JSON Web Tokens (JWT).
*   Create, Read, Update, and Delete tasks.
*   A clean and intuitive user interface.
*   A secure API for fetching ToDo items.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    mongoURI=<YOUR_MONGODB_CONNECTION_STRING>
    JWT_SECRET=<YOUR_JWT_SECRET>
    ```
4.  Start the server: `npm run dev`

## Project Overview

The application allows users to sign up, manage their ToDo lists, and interact with a secure API. It uses a MongoDB database to store user and task data, EJS as a template engine to render the frontend, and JWT for authentication.

## API Endpoints

The application exposes the following endpoints:

*   `GET /`: Renders the main page with a list of all ToDo items for the authenticated user.
*   `GET /signup`: Renders the user registration page.
*   `POST /signup`: Creates a new user account.
    *   **Request body**: `{ "username": "your_username", "email": "your_email", "password": "your_password" }`
*   `GET /login`: Renders the user login page.
*   `POST /login`: Authenticates a user and returns a JWT token as a cookie.
    *   **Request body**: `{ "email": "your_email", "password": "your_password" }`
*   `GET /logout`: Logs the user out by clearing the JWT cookie.
*   `POST /todos`: Creates a new ToDo item.
    *   **Request body**: `{ "text": "Your task description" }`
*   `POST /todos/toggle/:id`: Toggles the completion status of a ToDo item.
*   `POST /todos/delete/:id`: Deletes a ToDo item.
*   `GET /api/todos`: Retrieves a list of all ToDo items for the authenticated user.
    *   **Authentication**: Requires a valid JWT token sent as a cookie.

## Database

*   **Database:** MongoDB
*   **Connection:** The connection to the MongoDB database is handled in `mongo_connect.js`. It uses the `mongoose` library and expects a MongoDB connection URI from the `mongoURI` environment variable.
*   **Schemas:**
    *   The `Task` model is defined in `models/Task.js` with the following schema:
        *   `text`: String (required) - The description of the task.
        *   `completed`: Boolean (default: `false`) - The completion status of the task.
        *   `createdAt`: Date (default: `Date.now`) - The timestamp of when the task was created.
        *   `user`: ObjectId (ref: 'User') - The user who owns the task.
    *   The `User` model is defined in `models/Users.js` with the following schema:
        *   `username`: String (required, unique) - The user's username.
        *   `email`: String (required, unique) - The user's email address.
        *   `passwordHash`: String (required) - The hashed password of the user.
        *   `createdAt`: Date (default: `Date.now`) - The timestamp of when the user account was created.

## Frontend

*   **Templating:** The application uses EJS (`.ejs`) as its view engine, with the main views being `views/index.ejs`, `views/home.ejs`, `views/login.ejs` and `views/signup.ejs`.
*   **Styling:** The frontend is styled with a single CSS file located at `public/style.css`.
*   **Client-side Scripting:** Client-side interactions are handled by `public/script.js`. It uses `fetch` to make AJAX requests to the API endpoints for creating, toggling, and deleting tasks without a full page reload.

## Dependencies

The project relies on the following npm packages:

*   `bcrypt`: For hashing user passwords.
*   `cookie-parser`: To parse cookies from the request.
*   `cors`: To enable Cross-Origin Resource Sharing.
*   `dotenv`: To manage environment variables.
*   `ejs`: As the template engine.
*   `express`: As the web framework.
*   `jsonwebtoken`: To generate and verify JSON Web Tokens.
*   `mongoose`: As the MongoDB object modeling tool.
*   `nodemon`: (dev dependency) To automatically restart the server during development.

## Scripts

The `package.json` file defines the following scripts:

*   `npm test`: (Not yet implemented) - Displays an error message.
*   `npm run dev`: Starts the server in development mode using `nodemon`.
*   `npm run main`: Starts the server in production mode using `node`.