import { DataSource } from "typeorm";
import { Auth } from "../api/v1/models/Auth/authModel";

const dotenv = require("dotenv");
dotenv.config();

const dbParams = new DataSource({
  // type: "mysql",
  // host: process.env.MY_SQL_DB_HOST,
  // port: 3306,
  // username: process.env.MY_SQL_DB_USER,
  // password: process.env.MY_SQL_DB_PASSWORD,
  // database: process.env.MY_SQL_DB_DATABASE,
  // synchronize: true,
  // logging: true,
  // entities: ["src/api/v1/models/**/*.ts"],
  // migrations: ["src/api/v1/migrations/**/*.ts"],
  // subscribers: ["src/api/v1/subscriber/**/*.ts"],
  // cli: {
  //   entitiesDir: "src/api/v1/models",
  //   migrationsDir: "src/api/v1/migrations",
  //   subscribersDir: "src/api/v1/subscriber",
  // },
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "hrm",
  entities: [Auth],
  synchronize: true,
});

export default dbParams;
