// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express app
const app = express();

// Set up middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  published_date: Date
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// Define a POST endpoint to add a new book
app.post('/books', async (req, res) => {
  try {
    // Create a new book instance using the request body
    const newBook = new Book(req.body);

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Respond with the saved book
    res.status(201).json(savedBook);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

