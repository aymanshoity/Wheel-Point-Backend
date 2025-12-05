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
app.get('/api/v1/users/:id', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [req.params.id])
      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "user not found"
         })
      } else {
         res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows

         })
      }


   } catch (err: any) {
      return res.status(500).json({ message: 'Internal server error' })
   }

})
app.put('/api/v1/users/:id', async (req: Request, res: Response) => {
   const { name, email, role, phone } = req.body
   try {
      const result = await pool.query(`UPDATE users SET name=$1, email=$2,  role=$3, phone=$4 WHERE id=$5 RETURNING *`, [name, email, role, phone, req.params.id])
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
      return res.status(500).json({ message: 'Internal server error',details:err.message })
   }

})
app.delete('/api/v1/users/:id', async (req: Request, res: Response) => {
  
   try {
      const result =await pool.query(`DELETE FROM users WHERE id=$1`, [req.params.id])
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
      return res.status(500).json({ message: 'Internal server error',details:err.message })
   }

})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
