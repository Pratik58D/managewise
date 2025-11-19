import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env.js";

export const signup = async({name,email,password,role}:any)=>{
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await create({
        data:{name,email,password:hashedPassword , role}
    })

    return user;
}


export const login = async({email,password}:any)=>{
    const user = await ({where :{email}});
   if (!user) throw new Error("User not found");

   const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}