import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router=Router()

router.get('/',auth("admin"), userControllers.getUser)
router.get('/:userId',auth("admin","customer"), userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)

export const userRoute=router