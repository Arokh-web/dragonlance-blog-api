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
    res.end(
      JSON.stringify({
        message: `Created entry in ${url} successfully.`,
        data: result.rows[0],
      })
    );

    return;
  } catch (error) {
    console.error(`Error creating entry in ${url}: (Console)`, error.message);
    res.end(JSON.stringify({ error: error.message, origin: "createData" }));
  }
};
