import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: "postgres",
      dialectOptions: { ssl: true }
    });

  try {
    await sequelize.authenticate();
    console.log("Successfully connect database");
  } catch (error) {
    console.log("Failed connect database");
    console.log(error);
    process.exit(1); 
  }
  
  export default sequelize;