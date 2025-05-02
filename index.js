import express from "express";

// Import DB Stuff
import { tryConnections } from "./db/index_db.js";
import { initModels } from "./models/index_models.js";

// Import middlewares
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import usersRouter from "./routes/userRoute.js";
import booksRouter from "./routes/booksRoute.js";
import charactersRouter from "./routes/charactersRoute.js";
import postRouter from "./routes/postRoute.js";
import associateModels from "./models/associations.js";
import joinBookCharRouter from "./routes/bookCharRoute.js";

// Initializing App and DB
dotenv.config();
const app = express();
const PORT = process.env.API_PORT;
let db;

// Tries out all three possible db-connections and chooses the first one that works: local, render, neon
tryConnections()
  // after successfully connecting to the database, it initializes the models and sets up the express server
  // if this FAILS it will throw an error and exit the process. no API is needed if the DB is not reachable!
  .then((sequelize) => {
    // Initialize Models with the sequelize instance
    // console.log("Sequelize:", typeof sequelize);
    db = initModels(sequelize);

    // Associate models after initializing them
    associateModels(db);
    console.log("Successful: Initialized models and associations.");

    // Setting up general express middleware
    app.use(express.json());
    app.use(express.static("uploads")); // Serve static files from the uploads directory for tryouts
    app.use(cors());

    // Setting up routes; all of them are specific endpoints (follow-uzp-routes can be found in the respective route files)
    app.use("/dragonlance_books", booksRouter);
    app.use("/dragonlance_characters", charactersRouter);
    app.use("/posts", postRouter);
    app.use("/users", usersRouter);
    // app.use("/comments", commentRouter);
    app.use("/bookchar", joinBookCharRouter); // TODO: Implement this route

    app.use(errorHandler);
    app.listen(PORT, () =>
      console.log(`Server is running on  http://localhost:${PORT}/`)
    );
  })
  .catch((error) => {
    console.error("Failed DB-Connection: API exiting. Error:", error.message);
    process.exit(1);
  });

export { db };
