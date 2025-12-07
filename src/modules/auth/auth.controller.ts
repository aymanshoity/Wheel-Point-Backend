import { Request, Response } from "express"
import { authServices } from "./auth.service"

const userSignup= async (req: Request, res: Response) => {
   console.log(req.body)
   const {  password } = req.body

   if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
   }
   try {
      const result = await authServices.userSignup(req.body)
      const {password,...userObject}=result.rows[0]
      res.status(201).json({
         success: true,
         message: 'User registered successfully',
         data: userObject

      })

   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

}
const userSignin= async (req: Request, res: Response) => {
   console.log(req.body)
   const { email, password } = req.body

   try {
      const result = await authServices.userSignin(email, password)
      res.status(201).json({
         success: true,
         message: 'Login successful',
         data: result

      })

   } catch (err: any) {
      return res.status(500).json({success:false, message: 'Internal server error' , error: err.message})
   }

}


export const authControllers={
   userSignup,userSignin
}