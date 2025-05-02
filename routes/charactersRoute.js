import { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/characterController.js";
import validateSchema from "../middlewares/validateSchema.js";
import characterSchema from "../schemas/characterSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

const charactersRouter = Router();

// Define the routes for CHARACTERS
// POST, PUT, DELETE, UPDATE need asyncHandler to handle errors properly
// GET requests can be handled without asyncHandler

// Methods to all: Get, Post
charactersRouter
  .route("/")
  .get(getAllCharacters)
  .post(validateSchema(characterSchema), asyncHandler(createCharacter));

// Methods by ID: Get, Put, Delete
charactersRouter
  .route("/:id")
  .get(getCharacterById)
  .put(validateSchema(characterSchema), asyncHandler(updateCharacter))
  .delete(deleteCharacter);

export default charactersRouter;
