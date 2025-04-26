import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

let sequelize = null;

const tryConnections = async () => {
  const dbUrls = [
    process.env.DATABASE_URL_local,
    process.env.DATABASE_URL_render,
    process.env.DATABASE_URL_neon,
  ];

  for (const url of dbUrls) {
    try {
      const sequelize = new Sequelize(url);
      await sequelize.authenticate();
      console.log("Connected to DB.");
      return sequelize;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  throw new Error("Unable to connect to any database.");
};

export default { tryConnections, sequelize };
