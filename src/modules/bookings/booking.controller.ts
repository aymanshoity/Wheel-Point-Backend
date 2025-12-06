import { Request, Response } from "express"
import { pool } from "../../config/db"
import { vehiclesServices } from "../vehicles/vehicle.service"
import { bookingServices } from "./booking.service"

const createBookings=async (req: Request, res: Response) => {
   const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body

   const getVehicle = await vehiclesServices.getSingleVehicle(vehicle_id as string)
   
   try {
      if (getVehicle.rows[0].availability_status !== 'available') {
         return res.status(400).json({
            success: false,
            message: 'Vehicle is not available for booking'
         })
      } else {
         const start: Date = new Date(rent_start_date)
         const end: Date = new Date(rent_end_date)
         const total_rent_days: number = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
         const total_price: number = Number(total_rent_days * Number(getVehicle.rows[0].daily_rent_price))
         const status = 'active'
         const vehicle_availability_status = 'booked'
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price
            }
         }

         // insert data into bookings table
         const result = await bookingServices.createBookings({customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status})
         console.log(result.rows[0])
         if (result.rows[0]) {
            // update vehicle availability status
            await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [vehicle_availability_status, vehicle_id])
            res.status(201).json({
               success: true,
               message: 'Booking created successfully',
               data: { ...result.rows[0], ...vehicle_object }

            })
         }

      }




   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })

   }

}
const getBookings=  async (req: Request, res: Response) => {

   try {
      const result = await bookingServices.getBookings()
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Booking not found",
            data: result.rows
         })
      } else {
         const getUser = await pool.query(`SELECT * FROM users WHERE id=$1 `, [result.rows[0].customer_id])
         const getVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1 `, [result.rows[0].vehicle_id])
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price,
               type: getVehicle.rows[0].type
            }
         }
         const admin_view = {
            customer: {
               name: getUser.rows[0].name,
               email: getUser.rows[0].email
            },
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price
            }
         }
         res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: result.rows.map(booking => {
               return {
                  ...booking, ...admin_view
               }
            })

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const getSingleBooking=async (req: Request, res: Response) => {

   try {
      const result = await bookingServices.getSingleBooking((req.params.bookingId as string))
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Booking not found",
            data: result.rows
         })
      } else {
         const getVehicle = await vehiclesServices.getSingleVehicle(result.rows[0].vehicle_id as string)
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price,
               type: getVehicle.rows[0].type
            }
         }

         res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: {
               ...result.rows[0], ...vehicle_object
            }


         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const updateBooking= async (req: Request, res: Response) => {
   // console.log(req.body)
   const { status } = req.body
   try {
      const result = await bookingServices.updateBooking(status, req.params.bookingId as string)
      // console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {
         if (result.rows[0].status === 'cancelled' || result.rows[0].status === 'returned') {
            const vehicle_status = 'available'
            const vehicle_id = result.rows[0].vehicle_id
            await vehiclesServices.updateVehicle({ availability_status: vehicle_status }, vehicle_id as string)
            // await pool.query(`DELETE FROM bookings WHERE id=$1`, [req.params.bookingId])
            res.status(200).json({
               success: true,
               message: 'Booking updated successfully',
               data: result.rows[0].status === 'cancelled'? result.rows[0]:{...result.rows[0],...{vehicle:{availability_status:vehicle_status}}}

            })
         }




      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

}



export const bookingControllers={
   createBookings,getBookings,getSingleBooking,updateBooking
}