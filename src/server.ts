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
// User Crud Api
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
      return res.status(500).json({ message: 'Internal server error', details: err.message })
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
      return res.status(500).json({ message: 'Internal server error', details: err.message })
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
      return res.status(500).json({ message: 'Internal server error', details: err.message })
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
      return res.status(500).json({ message: 'Internal server error',details:err.message })
   }

})
app.delete('/api/v1/vehicles/:vehicleId', async (req: Request, res: Response) => {

   try {
      const result =await pool.query(`DELETE FROM vehicles WHERE id=$1`, [req.params.vehicleId])
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
      return res.status(500).json({ message: 'Internal server error',details:err.message })
   }

})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
