import { Router } from "express";
import { vehiclesControllers } from "./vehicle.controller";
import auth from "../../middlewares/auth";


const router=Router()

router.post('/',auth('admin'), vehiclesControllers.createVehicles)
router.get('/', vehiclesControllers.getVehicles)
router.get('/:vehicleId', vehiclesControllers.getSingleVehicle)
router.put('/:vehicleId',auth('admin'),vehiclesControllers.updateVehicle)
router.delete('/:vehicleId',auth('admin'), vehiclesControllers.deleteVehicle)

export const vehiclesRoute=router