# ExpressToDo

A simple ToDo application built with Express.js.

## Features

*   Create, Read, Update, and Delete tasks.
*   Simple and intuitive UI.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the server: `npm run dev`

## Project Overview

The application allows users to create, view, and delete tasks. It uses a MongoDB database to store the tasks and EJS as a template engine to render the frontend.

## API Endpoints

The application exposes the following endpoints:

*   `GET /`: Renders the main page with a list of all ToDo items.
*   `POST /todos`: Creates a new ToDo item.
    *   **Request body**: `{ "text": "Your task description" }`
*   `POST /todos/toggle/:id`: Toggles the completion status of a ToDo item.
*   `POST /todos/delete/:id`: Deletes a ToDo item.

## Database

*   **Database:** MongoDB
*   **Connection:** The connection to the MongoDB database is handled in `mongo_connect.js`. It uses the `mongoose` library and expects a MongoDB connection URI from the `mongoURI` environment variable.
*   **Schema:** The `Task` model is defined in `models/Task.js` and has the following schema:
    *   `text`: String (required) - The description of the task.
    *   `completed`: Boolean (default: `false`) - The completion status of the task.
    *   `createdAt`: Date (default: `Date.now`) - The timestamp of when the task was created.

## Frontend

*   **Templating:** The application uses EJS (`.ejs`) as its view engine, with the main view being `views/index.ejs`.
*   **Styling:** The frontend is styled with a single CSS file located at `public/style.css`.
*   **Client-side Scripting:** Client-side interactions are handled by `public/script.js`. It uses `fetch` to make AJAX requests to the API endpoints for creating, toggling, and deleting tasks without a full page reload.

## Dependencies

The project relies on the following npm packages:

*   `cors`: To enable Cross-Origin Resource Sharing.
*   `dotenv`: To manage environment variables.
*   `ejs`: As the template engine.
*   `express`: As the web framework.
*   `mongoose`: As the MongoDB object modeling tool.
*   `nodemon`: (dev dependency) To automatically restart the server during development.

## Scripts

The `package.json` file defines the following scripts:

*   `npm test`: (Not yet implemented) - Displays an error message.
*   `npm run dev`: Starts the server in development mode using `nodemon`.
*   `npm run main`: Starts the server in production mode using `node`.