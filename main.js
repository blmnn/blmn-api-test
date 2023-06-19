const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://belko:belko1234@cluster0.zlbsos4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);

// Create
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

// Read
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

// Update
app.patch('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

// Delete
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send('Book deleted');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});