import express from "express";
import routes from "./api/v1/routes";
import dbParams from "./config/dbConfig";
import cors from "cors";
import * as bodyParser from "body-parser";
//import { DATA_SOURCES } from "./config/dbConfig";
import { Auth } from "./api/v1/models/Auth/authModel";
import dotenv from "dotenv";
import { TypeORMError } from "typeorm";

dotenv.config();

const app = express();
const port = process.env.Port || 3000;

//dbconnection
dbParams
  .initialize()
  .then(async () => {
    // const auth = new Auth();
    // await dbParams.manager.save(auth);

    //app middlewares
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(routes);

    app.listen(parseInt(`${port}`), () => {
      console.log("app running at 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

//console.log(DATA_SOURCES);
