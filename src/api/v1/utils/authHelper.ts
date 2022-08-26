import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const generatePassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  };

export const generateJWT = async (email: string) => {
    return await jwt.sign(
      {
        email: email,
      },
      "SECRET",
      { expiresIn: "1h" }
    );
};