import { BaseEntity } from "typeorm";
import { Request, Response } from "express";
import { Auth } from "../models/Auth/authModel";
import { validate } from "class-validator";
import dbParams from "../../../config/dbConfig";

class AuthController extends BaseEntity {
  //method to register new user
  static register = async (req: Request, res: Response) => {
    console.log("hitting", req.body);
    const {
      email,
      password,
      first_name,
      last_name,
      company_name,
      phone_number,
      country_code,
    } = req.body;
    let newUser = new Auth();
    console.log(password);
    newUser.email = email;
    newUser.password = await newUser.setPassword(password);
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.company_name = company_name;
    newUser.phone_number = phone_number;
    newUser.country_code = country_code;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await dbParams.manager.save(newUser);
    } catch (e) {
      return res.status(409).send("User already exist");
    }

    return res.status(201).send("User created");
  };
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user;
    try {
      user = await dbParams.manager.findOneBy(Auth, { email: email });
      if (user && !user.isValidPassword(password)) {
        res.status(401).send("Incorrect password");
        return;
      }
      res.status(200).json({ access_token: user?.generate_JWT });
    } catch (e) {
      return res.status(401).send(e);
    }
  };
  static logout() {}
}

export default AuthController;
