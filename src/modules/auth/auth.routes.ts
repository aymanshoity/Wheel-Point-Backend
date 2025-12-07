import { Router } from "express";
import { authControllers } from "./auth.controller";


const router=Router()

router.post('/signup',authControllers.userSignup)
router.post('/signin',authControllers.userSignin)


export const authRoute=router