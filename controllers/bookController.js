import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";

export const getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) throw new ErrorResponse("Post not found.", 404);
  res.json(book);
};

export const createBook = async (req, res) => {
  const { title, author, description, image } = req.body;
  const book = await Book.create({
    title,
    author,
    description,
    image,
  });

  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, image } = req.body;

  const book = await Book.findByPk(id);

  if (!book) throw new ErrorResponse("Book not found.", 404);

  book.title = title;
  book.author = author;
  book.description = description;
  book.image = image;

  await book.save();

  res.json(book);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (!book) throw new ErrorResponse("Book not found.", 404);

  await book.destroy();

  res.status(204).send();
};
