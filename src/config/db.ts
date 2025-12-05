import config from "."
import {Pool} from 'pg'
export const pool=new Pool({
   connectionString:`${config.connectionString}`
})

export const initDB=async()=>{
   await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(200) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      CHECK (char_length(password)>=6 )
      )`)


   // await pool.query(`CREATE TABLE IF NOT EXISTS cars (
   //    id SERIAL PRIMARY KEY,
   //    make VARCHAR(50) NOT NULL,
   //    model VARCHAR(50) NOT NULL,
   //    year INT NOT NULL,
   //    price DECIMAL(10, 2) NOT NULL
   //    )`)
}
