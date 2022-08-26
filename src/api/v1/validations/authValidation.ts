import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const isValidPassword = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
  };

export const verifyToken = async (token: string) =>{
  const data = await jwt.verify(token, "SECRET", (err, data)=>{
     if(err) return err;
     console.log(data)
     return data
  })
  return data
}
