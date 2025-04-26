import { Router } from "express";
import {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/charactersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { characterSchema } from "../schemas/characterSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

const charactersRouter = Router();

// Define the routes for CHARACTERS
// POST, PUT, DELETE, UPDATE need asyncHandler to handle errors properly
// GET requests can be handled without asyncHandler

charactersRouter
  .route("/")
  .get(getCharacters)
  .post(validateSchema(characterSchema), asyncHandler(createCharacter));
charactersRouter
  .route("/:id")
  .get(getCharacterById)
  .put(validateSchema(characterSchema), asyncHandler(updateCharacter))
  .delete(deleteCharacter);

export default charactersRouter;
