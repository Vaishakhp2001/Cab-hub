import express, { json } from 'express'
import { config } from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import {connectDB} from './config/db.js'
import { notFound,errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'

const app = express()

app.use(json())

config()

connectDB() 

app.get('/',(req,res) => {
    console.log("running")
    res.send('Api is running')
    })

app.use('/api/users',userRoutes)

app.use(notFound)


app.use(errorHandler)

const PORT = process.env.PORT || 5000 




app.listen(
    PORT, 
    console.log(`Server running on port ${PORT}`)) 
