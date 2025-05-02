import ErrorResponse from "../utils/ErrorResponse.js";
import { db } from "../index.js";

export const getAllBooks = async (req, res) => {
  const books = await db.Book.findAll();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await db.Book.findByPk(id, {
    include: db.Character,
  });

  if (!book) throw new ErrorResponse("Book not found.", 404);
  res.json(book);
};

export const createBook = async (req, res) => {
  const { title, authors, description, cover, published_year } = req.body;
  const book = await db.Book.create({
    title,
    authors,
    description,
    cover,
    published_year,
  });

  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, authors, description, cover, published_year } = req.body;

  const book = await db.Book.findByPk(id);

  if (!book) throw new ErrorResponse("Book not found.", 404);

  book.title = title;
  book.authors = authors;
  book.description = description;
  book.cover = cover;
  book.published_year = published_year;

  await book.save();

  res.json(book);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await db.Book.findByPk(id);

  if (!book) throw new ErrorResponse("Book not found.", 404);

  await book.destroy();

  res.status(204).send();
};
