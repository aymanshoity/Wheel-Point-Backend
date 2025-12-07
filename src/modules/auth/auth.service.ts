import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const userSignup = async (payload: Record<string, unknown>) => {
   const { name, email, password, role, phone } = payload;
   const hashPassword=await bcrypt.hash(password as string,10);
   const result = await pool.query(`INSERT INTO users (name,email,password,role,phone) VALUES ($1, $2 ,$3 ,$4, $5) RETURNING *`, [name, email, hashPassword, role, phone])
   return result
}
const userSignin = async ( email:string, password:string) => {
   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
   if(result.rowCount===0){
      return null
   }
   const  user=result.rows[0];
   
   const isPasswordMatched=await bcrypt.compare(password,user.password)
   if(!isPasswordMatched){
      
      return false;
   }
   const secret=config.jwt_secrete as string;
   // console.log(secret)
   const  token = jwt.sign({ name: user.name, email: user.email, role: user.role },secret,{expiresIn:'14d'})
   // console.log(`Generated Token: ${token}`);
   const {password:any,...userObject}=user
   return {token,userObject}
}  

export const authServices = {
   userSignup,userSignin
}