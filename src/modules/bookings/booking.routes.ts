import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";



const router=Router()

router.post('/',auth("admin","customer"),bookingControllers.createBookings )
router.get('/',auth("admin"), bookingControllers.getBookings)
router.get('/:bookingId', auth("customer"),bookingControllers.getSingleBooking)
router.put('/:bookingId',auth('admin','customer'), bookingControllers.updateBooking)

export const bookingRoute=router