import express, { Request, Response } from 'express';
import { initDB, pool } from './config/db';


const app = express()
const port = 5000
// parser
app.use(express.json())


initDB()


app.get('/', (req: Request, res: Response) => {
   res.send('Vrooooooooooom!!!! carrr')
})
// auth crud api
app.post('/api/v1/auth/signup', async (req: Request, res: Response) => {
   console.log(req.body)
   const { name, email, password, role, phone } = req.body

   if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
   }
   try {
      const result = await pool.query(`INSERT INTO users (name,email,password,role,phone) VALUES ($1, $2 ,$3 ,$4, $5) RETURNING *`, [name, email, password, role, phone])
      console.log(result.rows[0])
      res.status(201).json({
         success: true,
         message: 'User registered successfully',
         data: result.rows[0]

      })

   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
// User Crud Api
app.get('/api/v1/users', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM users`)
      res.status(200).json({
         success: true,
         message: 'Users retrieved successfully',
         data: result.rows

      })

   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.get('/api/v1/users/:userId', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [req.params.userId])
      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {
         res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.put('/api/v1/users/:userId', async (req: Request, res: Response) => {
   const { name, email, role, phone } = req.body
   try {
      const result = await pool.query(`UPDATE users SET name=$1, email=$2,  role=$3, phone=$4 WHERE id=$5 RETURNING *`, [name, email, role, phone, req.params.userId])
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

})
app.delete('/api/v1/users/:userId', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`DELETE FROM users WHERE id=$1`, [req.params.userId])
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

})
// Vehicle Crud Api
app.post('/api/v1/vehicles', async (req: Request, res: Response) => {
   console.log(req.body)
   const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body

   try {
      const result = await pool.query(`INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1, $2 ,$3 ,$4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status])
      console.log(result.rows[0])
      res.status(201).json({
         success: true,
         message: 'Vehicle created successfully',
         data: result.rows[0]

      })

   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })
   }

})
app.get('/api/v1/vehicles', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM vehicles`)
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {
         res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.get('/api/v1/vehicles/:vehicleId', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [req.params.vehicleId])
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {
         res.status(200).json({
            success: true,
            message: 'Vehicle retrieved successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.put('/api/v1/vehicles/:vehicleId', async (req: Request, res: Response) => {
   // console.log(req.body)
   const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body
   try {
      const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2,  registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId])
      // console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: result.rows[0]

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

})
app.delete('/api/v1/vehicles/:vehicleId', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [req.params.vehicleId])
      console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {

         res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully',
            data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

})

// bookings Crud Api
app.post('/api/v1/bookings', async (req: Request, res: Response) => {
   // console.log(req.body)
   const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body

   // const getUser = await pool.query(`SELECT * FROM users WHERE id=$1 `, [customer_id])
   const getVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1 `, [vehicle_id])
   // console.log(getUser.rows[0])
   // console.log(getVehicle.rows[0])
   try {
      if (getVehicle.rows[0].availability_status !== 'available') {
         return res.status(400).json({
            success: false,
            message: 'Vehicle is not available for booking'
         })
      } else {
         const start: Date = new Date(rent_start_date)
         const end: Date = new Date(rent_end_date)
         const total_rent_days: number = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
         const total_price: number = Number(total_rent_days * Number(getVehicle.rows[0].daily_rent_price))
         const status = 'active'
         const vehicle_availability_status = 'booked'
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price
            }
         }

         // insert data into bookings table
         const result = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES ($1, $2 ,$3 ,$4, $5 ,$6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price as number, status])
         console.log(result.rows[0])
         if (result.rows[0]) {
            // update vehicle availability status
            await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [vehicle_availability_status, vehicle_id])
            res.status(201).json({
               success: true,
               message: 'Booking created successfully',
               data: { ...result.rows[0], ...vehicle_object }

            })
         }

      }




   } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Internal server error', details: err.message })

   }

})
app.get('/api/v1/bookings', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM bookings`)
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Booking not found",
            data: result.rows
         })
      } else {
         const getUser = await pool.query(`SELECT * FROM users WHERE id=$1 `, [result.rows[0].customer_id])
         const getVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1 `, [result.rows[0].vehicle_id])
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price,
               type: getVehicle.rows[0].type
            }
         }
         const admin_view = {
            customer: {
               name: getUser.rows[0].name,
               email: getUser.rows[0].email
            },
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price
            }
         }
         res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: result.rows.map(booking => {
               return {
                  ...booking, ...admin_view
               }
            })

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.get('/api/v1/bookings/:bookingId', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM bookings  WHERE id=$1`, [req.params.bookingId])
      if (result.rows.length === 0) {
         res.status(404).json({
            success: true,
            message: "Booking not found",
            data: result.rows
         })
      } else {
         const getVehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1 `, [result.rows[0].vehicle_id])
         const vehicle_object = {
            vehicle: {
               vehicle_name: getVehicle.rows[0].vehicle_name,
               daily_rent_price: getVehicle.rows[0].daily_rent_price,
               type: getVehicle.rows[0].type
            }
         }

         res.status(200).json({
            success: true,
            message: 'Vehicles retrieved successfully',
            data: {
               ...result.rows[0], ...vehicle_object
            }


         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.put('/api/v1/bookings/:bookingId', async (req: Request, res: Response) => {
   // console.log(req.body)
   const { status } = req.body
   try {
      const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, req.params.bookingId])
      // console.log(result)
      if (result.rowCount === 0) {
         res.status(404).json({
            success: true,
            message: "Vehicle not found",
            data: result.rows
         })
      } else {
         if (result.rows[0].status === 'cancelled' || result.rows[0].status === 'returned') {
            const vehicle_status = 'available'
            const vehicle_id = result.rows[0].vehicle_id
            await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [vehicle_status, vehicle_id])
            // await pool.query(`DELETE FROM bookings WHERE id=$1`, [req.params.bookingId])
            res.status(200).json({
               success: true,
               message: 'Booking updated successfully',
               data: result.rows[0].status === 'cancelled'? result.rows[0]:{...result.rows[0],...{vehicle:{availability_status:vehicle_status}}}

            })
         }




      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error', details: err.message })
   }

})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
