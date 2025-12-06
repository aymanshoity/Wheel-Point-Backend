import { Request, Response } from "express"
import { pool } from "../../config/db"
import { vehiclesServices } from "./vehicle.service"

const createVehicles=async (req: Request, res: Response) => {
 
   try {
      const result = await vehiclesServices.createVehicles(req.body)
      console.log(result.rows[0])
      res.status(201).json({
         success: true,
         message: 'Vehicle created successfully',
         data: result.rows[0]

      })

   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

}
const getVehicles= async (req: Request, res: Response) => {

   try {
      const result = await vehiclesServices.getSingleVehicle(req.params.vehicleId as string)
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {
         res.status(200).json({
            success: true,
            message: 'Vehicle retrieved successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const getSingleVehicle=async(id:string)=>{
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id as string])
   return result
}
const updateVehicle= async (req: Request, res: Response) => {
   
   try {
      const result = await vehiclesServices.updateVehicle(req.body,req.params.vehicleId as string)
      // console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

}
const deleteVehicle= async (req: Request, res: Response) => {

   try {
      const result = await vehiclesServices.deleteVehicle(req.params.vehicleId as string)
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully',
            data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

}


export const vehiclesControllers={
   createVehicles,getVehicles,getSingleVehicle,updateVehicle,deleteVehicle
}