import express, { json } from 'express'
import { config } from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import {connectDB} from './config/db.js'
import { notFound,errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
// import process from 'process'

// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(json())

config()

connectDB() 

app.use('/api/users',userRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'frontend','build','index.html'));
    })
}
else {
    app.get('/',(req,res) => {
        res.send('Api is running')
    })
}

app.use(notFound)


app.use(errorHandler)

const PORT = process.env.PORT || 5000 




app.listen(
    PORT, 
    console.log(`Server running on port ${PORT}`)) 
