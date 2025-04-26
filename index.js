import express from "express";
import cors from "cors";
import tryConnections from "./db/index_db.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";

// importing routes
import usersRouter from "./routes/userRoute.js";
import booksRouter from "./routes/booksRoute.js";
import charactersRouter from "./routes/charactersRoute.js";
import postRouter from "./routes/postRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

tryConnections()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Setting up general express middleware
app.use(express.static("uploads")); // Serve static files from the uploads directory for tryouts
app.use(cors());
app.use(express.json());

// Setting up routes; all of them are specific endpoints (follow-uzp-routes can be found in the respective route files)
// app.use('/') Necessary??
app.use("/dragonlance_books", booksRouter);
app.use("/dragonlance_characters", charactersRouter);
app.use("/posts", postRouter);
app.use("/users", usersRouter);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
