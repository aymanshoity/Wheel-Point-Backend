import config from "."
import { Pool } from 'pg'
export const pool = new Pool({
   connectionString: `${config.connectionString}`
})

export const initDB = async () => {
  
   await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL CHECK (char_length(password)>=6 ),
      phone VARCHAR(15) NOT NULL,
      role VARCHAR(150)
      )`)

  
   await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(50) NULL,
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price INT NOT NULL ,
      availability_status VARCHAR(50) NOT NULL CHECK (daily_rent_price>=0)
      
      )`)

   await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
      total_price INT NOT NULL ,
      status VARCHAR(50) NOT NULL
   )`)



}
