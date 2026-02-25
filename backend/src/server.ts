import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/task.routes'
import userRoutes from './routes/user.routes'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cookieParser())
app.use(cors({
   origin: 'http://localhost:4200',
   credentials: true 
}))
app.use(express.json())

app.use('/tasks', taskRoutes)
app.use('/user', userRoutes)

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000')
})