import { pool } from "../../config/db"

const createBookings=async(payload:Record<string,unknown>)=>{
   const { customer_id, vehicle_id, rent_start_date, rent_end_date,total_price,status }  = payload
   const result = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES ($1, $2 ,$3 ,$4, $5 ,$6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status])
   return result
}
const getBookings=async()=>{
   const result = await pool.query(`SELECT * FROM bookings`)
   return result
}
const getSingleBooking=async(id:string)=>{
    const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id as string])
   return result
}

const updateBooking=async(status:string,id:string)=>{
   const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, id as string])
   return result
}



export const bookingServices={
   createBookings,getBookings,getSingleBooking,updateBooking,
}