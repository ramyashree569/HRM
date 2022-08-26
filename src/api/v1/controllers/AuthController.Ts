import { BaseEntity } from "typeorm";
import { Request, Response } from "express";
import { Auth } from "../models/Auth/authModel";
import { validate } from "class-validator";
import dbParams from "../../../config/dbConfig";
import { generatePassword, generateJWT } from '../utils/authHelper'
import { isValidPassword, verifyToken } from "../validations/authValidation"; 
import * as jwt from 'jsonwebtoken'


  //method to register new user
export const register = async (req: Request, res: Response) => {
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
    newUser.email = email;
    newUser.password = await generatePassword(password);
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
      return res.status(409).send('User already exist');
    }

    return res.status(201).send('User created');
  };


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    let user: Auth | null
    try {
      user = await dbParams.manager.findOneBy(Auth, { email: email })
      if (user && !isValidPassword(password, user.password)) {
        res.status(401).send('Incorrect Credentials');
        return;
      }
      let token = await generateJWT(email);
      res.status(200).json({ access_token: token });
    } catch (e) {
      return res.status(401).send(e);
    }
  };

export const displayData = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1] || ''
    console.log(token)
    try{
      const isValidToken = await verifyToken(token)
      res.status(200).json({validUser: isValidToken})
    } catch(e) {
      res.status(401).send(e)
    } 
}

export const logout = async (req: Request, res: Response) => {

}
