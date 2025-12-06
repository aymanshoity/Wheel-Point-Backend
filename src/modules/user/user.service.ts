import { pool } from "../../config/db"

const getUser=async()=>{
   const result = await pool.query(`SELECT * FROM users`)
   return result
}
const getSingleUser=async(id:string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
   return result
}
const updateUser=async(payload:Record<string,unknown>,id:string)=>{
   const {name,email,role,phone}=payload
   const result = await pool.query(`UPDATE users SET name=$1, email=$2,  role=$3, phone=$4 WHERE id=$5 RETURNING *`, [name, email, role, phone, id as string])
   return result
}
const deleteUser=async(id:string)=>{
   const result =  await pool.query(`DELETE FROM users WHERE id=$1`, [id])
   return result
}


export const userServices={
   getUser,getSingleUser,updateUser,deleteUser
}