export const createOrUpdateData = async ({
  method,
  res,
  url,
  parsed,
  client,
}) => {
  console.log("Data to be inserted:", parsed);
  // DATA processing START
  const tableName = url.replace("/", "");
  console.log(`Creating entry for ${tableName}...`);

  // LOGIN CHECK FROM HERE
  if (url === "/users/login") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        const parsed = JSON.parse(body);
        const { email, password_hash } = parsed;

        // Check if email and password_hash are provided
        const result = await client.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = result.rows[0];

        if (!user) {
          res.statusCode = 401;
          console.error("User not found:", email);
          res.end(JSON.stringify({ error: "User not found" }));
          return;
        }

        if (user.password_hash !== password_hash) {
          res.statusCode = 401;
          console.error("Incorrect password for user:", email);
          res.end(JSON.stringify({ error: "Incorrect password" }));
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(user));
      });
    } catch (err) {
      console.error("Login error:", err.message);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Login failed", details: err.message }));
    }

    return;
  }
  // LOGIN CHECK END

  // DATA CRATION FROM HERE
  const columns = Object.keys(parsed).filter((key) => key !== "id"); // filter out id if present
  const placeholders = columns
    .map((_, index) => `$${index + 1}`) //_ is a placeholder for the value
    .join(", ");
  const values = columns.map((col) => parsed[col]);
  let id = parsed.id;
  // DATA processing END

  // Start of idHandler here
  // frontend check useful to only send altered data??
  const idHandler = () => {
    // Creating the SET clause for the UPDATE statement
    const setClause = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(", ");
    const idPlaceholder = `$${columns.length + 1}`; // id is the last placeholder

    return {
      text: `UPDATE ${tableName} SET ${setClause} WHERE id = ${idPlaceholder} RETURNING *;`,
      values: [...values, id],
    };
  };

  // CREATION of actual QUERY
  const query =
    method === "PUT" && id
      ? idHandler()
      : {
          text: `INSERT INTO ${tableName} (${columns.join(
            ", "
          )}) VALUES (${placeholders}) RETURNING *;`,
          values,
        };

  console.log(`Executing query: ${query}`);

  // Execution of the query
  try {
    const result = await client.query(query.text, query.values);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    console.log(`Created entry in ${url} successfully:`, result.rows[0]);

    JSON.stringify({
      message: `Created entry in ${url} successfully.`,
      data: result.rows[0],
    });
    res.end();

    return;
  } catch (error) {
    console.error(`Error creating entry in ${url}: (Console)`, error.message);
    res.end(JSON.stringify({ error: error.message, origin: "createData" }));
  }
};
