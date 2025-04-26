import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import  validateSchema  from "../middlewares/validateSchema.js";
import  bookSchema  from "../schemas/bookSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

const booksRouter = Router();

// Define the routes for BOOKS, starting from the original /dragonlance_books endpoint
// POST, PUT, DELETE, UPDATE need asyncHandler to handle errors properly
// GET requests can be handled without asyncHandler

booksRouter
  .route("/")
  .get(getAllBooks)
  .post(validateSchema(bookSchema), asyncHandler(createBook));
booksRouter
  .route("/:id")
  .get(getBookById)
  .put(validateSchema(bookSchema), asyncHandler(updateBook))
  .delete(asyncHandler(deleteBook));

export default booksRouter;
