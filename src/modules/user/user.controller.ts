import { Request, Response } from "express"
import { pool } from "../../config/db"
import { userServices } from "./user.service"

const getUser=async (req: Request, res: Response) => {

   try {
      const result = await userServices.getUser()
      
      res.status(200).json({
         success: true,
         message: 'Users retrieved successfully',
         data: result.rows.map(user=>{
            const {password,...userObj}=user;
            return userObj;
         })

      })

   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const getSingleUser=async (req: Request, res: Response) => {

   try {
      const result = await userServices.getSingleUser(req.params.userId as string)
      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {
         const {password,...userObj}=result.rows[0]
         res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: userObj

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const updateUser=async (req: Request, res: Response) => {
   try {
      const result = await userServices.updateUser(req.body, req.params.userId as string)
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {
         const {password,...userObj}=result.rows[0]
         res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: userObj

         })
      }


   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

}
const deleteUser=async (req: Request, res: Response) => {

   try {
      const result = await userServices.deleteUser(req.params.userId as string)
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            // data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

}


export const userControllers={
   getUser,getSingleUser,updateUser,deleteUser
}