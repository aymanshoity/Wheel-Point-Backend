import express, { Request, Response } from 'express';
import { initDB } from './config/db';
import { userRoute } from './modules/user/user.routes';
import { vehiclesRoute } from './modules/vehicles/vehicle.route';
import { bookingRoute } from './modules/bookings/booking.routes';
import { authRoute } from './modules/auth/auth.routes';


const app = express()

// parser
app.use(express.json())


initDB()


app.get('/', (req: Request, res: Response) => {
   res.send('Vrooooooooooom!!!! carrr')
})
// auth crud api
app.use('/api/v1/auth',authRoute)
// User Crud Api
app.use('/api/v1/users', userRoute )
// Vehicle Crud Api
app.use('/api/v1/vehicles', vehiclesRoute)

// bookings Crud Api
app.use('/api/v1/bookings', bookingRoute)

export default app;
