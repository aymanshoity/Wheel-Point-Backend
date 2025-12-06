import { Router } from "express";
import { bookingControllers } from "./booking.controller";



const router=Router()

router.post('/',bookingControllers.createBookings )
router.get('/', bookingControllers.getBookings)
router.get('/:bookingId', bookingControllers.getSingleBooking)
router.put('/:bookingId', bookingControllers.updateBooking)

export const bookingRoute=router