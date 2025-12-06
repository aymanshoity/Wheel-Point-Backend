import { Router } from "express";
import { userControllers } from "./user.controller";

const router=Router()

router.get('/', userControllers.getUser)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)

export const userRoute=router