import { table } from "console";
import { createOrUpdateData } from "./creationHandler.js";

export const getHandler = async ({ req, res, url, client }) => {
  const parts = url.split("/").filter(Boolean);
  const tableName = parts[0]; // Extracting the table name from the URL
  const id = parts[1]; // Extracting the id from the URL

  // CREATION of actual QUERY
  const query = id
    ? {
        text: `SELECT * FROM ${tableName} WHERE id = $1`,
        values: [id],
      }
    : { text: `SELECT * FROM ${tableName}`, values: [] };

  try {
    // GET -> request (folder with all created data per url or per id)
    res.statusCode = 200;

    const result = await client.query(query.text, query.values);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Content-Type", "application/json");
    console.info(`GET request on ${url} successfully!`);
    res.end(JSON.stringify(result.rows));
    return;
  } catch (error) {
    res.statusCode = 500;
    console.error(`Error fetching ${url}:`, error.message);
    res.end(`Error fetching ${url}:`, error.message);
  }
};

export const writeHandler = async ({ req, res, url, client }) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const parsed = JSON.parse(body);
      await createOrUpdateData({
        method: req.method,
        res,
        url,
        parsed,
        client,
      });
      res.statusCode = 201;
    } catch (error) {
      res.statusCode = 500;
      console.error(`Error creating ${url}:`, error.message);
      res.end(`Error creating ${url}:`, error.message);
    }
  });
};

export const deleteHandler = async ({ res, url, client }) => {
  const parts = url.split("/").filter(Boolean);
  const tableName = parts[0];
  const id = parts[1];

  if (!id) {
    res.statusCode = 400;
    return res.end("Missing ID for DELETE.");
  }
  try {
    const result = await client.query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING *;`,
      [id]
    );
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    console.info(`DELETE request on ${url} successfully!`);
    res.statusCode = 200;

    if (result.rowCount === 0) {
      res.statusCode = 404;
      console.log(`Entry with ID ${id} not found.`);
      return res.end("Entry not found.");
    }
    res.end("Deleted.");
    return;
  } catch (error) {
    console.error(`Error deleting ${url}:`, error.message);
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ message: "Deletion failed.", data: result.rows[0] })
    );
  }
};
