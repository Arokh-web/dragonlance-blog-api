import http from "http";
import pg from "pg";
import "dotenv/config";
import { getHandler, writeHandler, deleteHandler } from "./methodHandler.js";

//CONNECTION TO DB STARTS HERE
const { Client } = pg;
const client = new Client();

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}
// TEST CONNECTION
connectToDatabase();
//CONNECTION TO DB ENDS HERE

const requestHandler = async (req, res) => {
  const { method, url } = req;

  // Accepted methods/URLs also fetchable from DB??
  const acceptedMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
    "PATCH",
    "HEAD",
  ];
  const acceptedUrls = [
    "/posts",
    "/users",
    "/dragonlance_books",
    "/dragonlance_characters",
  ];

  console.log(url);

  const acceptedPath = acceptedUrls.map((link) => link.slice(1)).join("|"); // "posts|users|dragonlance_books|dragonlance_characters" for regex
  const isExactMatch = new RegExp(`^\/(${acceptedPath})/?$`).test(url);
  const singleUrlRegex = new RegExp(`^\/(${acceptedPath})\/[0-9a-zA-Z]+/?$`);

  const isUrlAccepted = isExactMatch || singleUrlRegex.test(url); // true if url is in acceptedUrls or matches the regex
  const isMethodAccepted = acceptedMethods.includes(method); // true if method is in acceptedMethods
  // Accepted methods/URLs END

  //   SWITCH for methods
  if (isMethodAccepted) {
    // Desctructuring the request object for use in the handler functions
    const handlerData = { req, res, url, client };
    const errorMessage = `Bad Request: ${url} is not a valid URL.`; //errorMessage for use everywhere

    switch (method) {
      case "GET":
        console.log(`GET request on ${url}`);
        // GET -> request (folder with all created data per url)
        if (isUrlAccepted) {
          console.log(`GET request on ${url} accepted.`);
          await getHandler(handlerData);
          return;
        } else {
          res.statusCode = 400;
          res.end(errorMessage);
          return;
        }

      // POST and PUT in one!
      case "POST":
      case "PUT":
        console.log(`${method} request on ${url}`);

        // POST -> (create new data); PUT -> (update existing data); only creator or admin can do this
        if (isUrlAccepted) {
          console.log(`${method} request on ${url} accepted.`);
          await writeHandler(handlerData);
          return;
        } else {
          res.statusCode = 400;
          res.end(errorMessage);
          return;
        }
      // PUT -> /posts (update existing post; only creator or admin can do this)

      case "DELETE":
        console.log(`DELETE request on ${url}`);
        // DELETE -> /posts (delete existing post; only creator or admin can do this)
        if (isUrlAccepted) {
          console.log(`${method} request on ${url} accepted.`);
          await deleteHandler(handlerData);
          return;
        } else {
          res.statusCode = 400;
          res.end(errorMessage);
          return;
        }
      case "OPTIONS":
        console.log(`OPTIONS request on ${url}`);
        // OPTIONS -> (checks which methods are allowed on a specific endpoint; needs to be set manually; a methodMAP would be useful?) --> needed for cors-access
        const allowedOrigins = [
          "http://localhost:5173",
          "https://dragonlance-blog-client.onrender.com/",
          "https://dragonlance-blog-api.onrender.com/",
        ];
        try {
          if (isUrlAccepted) {
            res.writeHead(204, {
              "Access-Control-Allow-Origin": `${allowedOrigins}`,
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            });
            console.log("OPTIONS request successful.");
            return res.end("OPTIONS request successful.");
          } else {
            res.writeHead("Error:", 404);
            return res.end(errorMessage);
          }
        } catch (error) {
          res.statusCode = 500;
          console.error("Error getting OPTIONS:", error.message);
          return res.end(errorMessage);
        }

        break;
      case "PATCH":
        console.log(`PATCH request on ${url}`);
        break;
      case "HEAD":
        console.log(`HEAD request on ${url}`);
        break;
      default:
        res.statusCode = 405;
        res.end("Method Not Allowed");
        break;
    }
  }

  // Fallback: 404
  res.statusCode = 404;
  res.end("Not Found");
};

// SERVER START HERE
const server = http.createServer(requestHandler);
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server running at ${process.env.PGHOST} on port ${port}`)
);
server.on("error", (err) => {
  console.error("Server error:", err.message);
});
