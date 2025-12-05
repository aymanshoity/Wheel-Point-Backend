import config from "."
import { Pool } from 'pg'
export const pool = new Pool({
   connectionString: `${config.connectionString}`
})

export const initDB = async () => {
   // await pool.query(`CREATE TYPE role_enum AS ENUM('admin', 'customer')`)
   await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL CHECK (char_length(password)>=6 ),
      role VARCHAR(150) NOT NULL,
      phone VARCHAR(15) NOT NULL
      )`)

   // await pool.query(`CREATE TYPE vehicle_type_enum AS ENUM('car', 'bike', 'van', 'SUV')`)
   // await pool.query(`CREATE TYPE availability_status_enum AS ENUM('available', 'booked')`)
   await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(50) NULL,
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price NUMERIC(10,2) NOT NULL ,
      availability_status VARCHAR(50) NOT NULL,
      CHECK (daily_rent_price>=0)
      )`)



}
