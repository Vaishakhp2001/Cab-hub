import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'


const authUser = asyncHandler(async (req,res) => {
   
    const { email, password } = req.body

    const user = await User.findOne({ email })

    
    if(user && (await user.matchPassword(password))) {
        
       
         res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             phone: user.phone,
             isAdmin: user.isAdmin,
             token: generateToken(user._id)
         })

    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
    
})

const registerUser = asyncHandler(async (req,res) => {
    
    let { name, email, phone, password } = req.body

    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(401)
        throw new Error('User already exists')
        
    }

    password =await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        phone,
        password 
    })

    if(user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
      
        
    } else {
        res.status(400)
        throw new Error("Invalid user data")
        
    }
    
})


export { authUser,registerUser }
