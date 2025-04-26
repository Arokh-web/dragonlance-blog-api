import express from "express";

// Import DB Stuff
import { tryConnections } from "./db/index_db.js";
import { initModels } from "./models/index_models.js";

// Import middlewares
import errorHandler from "./middlewares/errorHandler.js";
import ErrorResponse from "./utils/ErrorResponse.js";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import usersRouter from "./routes/userRoute.js";
import booksRouter from "./routes/booksRoute.js";
import charactersRouter from "./routes/charactersRoute.js";
import postRouter from "./routes/postRoute.js";

// Initializing App and DB
dotenv.config();
const app = express();
const PORT = process.env.API_PORT;
let db;

tryConnections()
  .then((sequelize) => {
    // Initialize Models with the sequelize instance
    // console.log("Sequelize:", typeof sequelize);
    db = initModels(sequelize);
    console.log("Successful.");

    // Setting up general express middleware
    app.use(express.json());
    app.use(express.static("uploads")); // Serve static files from the uploads directory for tryouts
    app.use(cors());

    // Setting up routes; all of them are specific endpoints (follow-uzp-routes can be found in the respective route files)
    app.use("/dragonlance_books", booksRouter);
    app.use("/dragonlance_characters", charactersRouter);
    app.use("/posts", postRouter);
    app.use("/users", usersRouter);

    app.use(errorHandler);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed DB-Connection: API exiting. Error:", error.message);
    process.exit(1);
  });

export { db };
