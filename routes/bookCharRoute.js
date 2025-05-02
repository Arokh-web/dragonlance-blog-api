import { Router } from "express";
import {
  getAllCharsFromBook,
  getAllBooksFromChar,
} from "../controllers/joinBookCharController.js";
import asyncHandler from "../utils/asyncHandler.js";

const joinBookCharRouter = Router();

joinBookCharRouter.route("/book/:id").get(asyncHandler(getAllCharsFromBook));

joinBookCharRouter
  .route("/character/:id")
  .get(asyncHandler(getAllBooksFromChar));

export default joinBookCharRouter;
