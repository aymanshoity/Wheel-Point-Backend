import { Request, Response } from "express"
import { authServices } from "./auth.service"

const userSignup= async (req: Request, res: Response) => {
   console.log(req.body)
   const { name, email, password, role, phone } = req.body

   if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
   }
   try {
      const result = await authServices.userSignup(req.body)
      console.log(result.rows[0])
      res.status(201).json({
         success: true,
         message: 'User registered successfully',
         data: result.rows[0]

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
         message: 'User registered successfully',
         data: result

      })

   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' , error: err.message})
   }

}


export const authControllers={
   userSignup,userSignin
}