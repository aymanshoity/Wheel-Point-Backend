import express, { Request, Response } from 'express';
import { initDB, pool } from './config/db';
import { userRoute } from './modules/user/user.routes';
import { vehiclesRoute } from './modules/vehicles/vehicle.route';
import { bookingRoute } from './modules/bookings/booking.routes';


const app = express()

// parser
app.use(express.json())


initDB()


app.get('/', (req: Request, res: Response) => {
   res.send('Vrooooooooooom!!!! carrr')
})
// auth crud api
// app.post('/api/v1/auth/signup', async (req: Request, res: Response) => {
//    console.log(req.body)
//    const { name, email, password, role, phone } = req.body

//    if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters long' })
//    }
//    try {
//       const result = await pool.query(`INSERT INTO users (name,email,password,role,phone) VALUES ($1, $2 ,$3 ,$4, $5) RETURNING *`, [name, email, password, role, phone])
//       console.log(result.rows[0])
//       res.status(201).json({
//          success: true,
//          message: 'User registered successfully',
//          data: result.rows[0]

//       })

//    } catch (err: any) {
//       return res.status(500).json({ message: 'Internal server error' })
//    }

// })
// User Crud Api
app.use('/api/v1/users', userRoute )


// Vehicle Crud Api
app.use('/api/v1/vehicles', vehiclesRoute)

// bookings Crud Api
app.use('/api/v1/bookings', bookingRoute)

export default app;
