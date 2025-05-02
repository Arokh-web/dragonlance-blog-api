import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import userSchema from "../schemas/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

const usersRouter = Router();

// Define the routes for USERS, starting from the original /users endpoint
// POST, PUT, DELETE, UPDATE need asyncHandler to handle errors properly
// GET requests can be handled without asyncHandler

// Methods to all: Get, Post
usersRouter
  .route("/")
  .get(getUsers)
  .post(validateSchema(userSchema), asyncHandler(createUser));

// Methods by ID: Get, Put, Delete
usersRouter
  .route("/:id")
  .get(getUserById)
  .put(validateSchema(userSchema), asyncHandler(updateUser))
  .delete(deleteUser);

export default usersRouter;
