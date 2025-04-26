import { Router } from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

const postRouter = Router();

// Define the routes for POSTS, starting from the original /posts endpoint
// POST, PUT, DELETE, UPDATE need asyncHandler to handle errors properly
// GET requests can be handled without asyncHandler

postRouter
  .route("/")
  .get(getPosts)
  .post(validateSchema(postSchema), asyncHandler(createPost));
postRouter
  .route("/:id")
  .get(getPostById)
  .put(validateSchema(postSchema), asyncHandler(updatePost))
  .delete(deletePost);

export default postRouter;
