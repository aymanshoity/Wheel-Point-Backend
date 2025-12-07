import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles:string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = req.headers.authorization?.split(' ')[1];
         console.log('AuthToken:', token)

         if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
         }
         const decodedToken = jwt.verify(token, config.jwt_secrete as string) as JwtPayload
         console.log('Decoded Token:', { decodedToken })
         req.user = decodedToken 
         if(roles.length && !roles.includes(decodedToken.role as string)){
            res.status(401).json({
               success:false,
               message:"UnAuthorized",
            })
         }
         next()
      } catch (err: any) {
         res.status(401).json({success:false, message: 'Unauthorized', error: err.message })
      }

   }
}

export default auth;