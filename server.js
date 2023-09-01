'use strict'; // Enable strict mode for better error handling and coding practices

// Import the necessary modules
const express = require('express'); // Express a framework for creating a web server
const routes = require('./routes/index'); // Import your defined routes
const { clog } = require('./middleware/clog'); // Import custom middleware for logging

// Define the port on which the server will listen to
const PORT = process.env.PORT || 3001; // Use either the provided environment port or 3001
const app = express(); // Create an instance of the Express application

app.use(clog); // Use the custom logging middleware for all requests

// Set up middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes); // Use the defined routes for handling different endpoints

// Set up a catch-all middleware for handling requests that do not match any route
app.use((req, res) => {
  res.status(404).end(); // Respond with a 404 status if the route is not found
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
