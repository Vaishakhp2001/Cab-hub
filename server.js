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

// app.get('/', (req,res) => {
//     // res.send('API is running')  
//     res.sendFile(path.resolve(__dirname,'/frontend/build','index.html'))
// })

app.use('/api/users',userRoutes)

app.use(notFound)

app.use('/images',express.static(path.join(__dirname,'/images')))

app.use(errorHandler)

const PORT = process.env.PORT || 5000 

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


app.listen(
    PORT, 
    console.log(`Server running on port ${PORT}`)) 