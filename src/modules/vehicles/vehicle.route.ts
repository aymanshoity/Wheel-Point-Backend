import { Router } from "express";
import { vehiclesControllers } from "./vehicle.controller";


const router=Router()

router.post('/', vehiclesControllers.createVehicles)
router.get('/', vehiclesControllers.getVehicles)
router.get('/:vehiclesId', vehiclesControllers.getSingleVehicle)
router.put('/:vehiclesId',vehiclesControllers.updateVehicle )
router.delete('/:vehiclesId', vehiclesControllers.deleteVehicle)

export const vehiclesRoute=router