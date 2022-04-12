import { Router } from 'express'
const router = Router()
import {authUser} from '../controllers/userController.js'
import protect from '../middleware/authModdleware.js'
import {registerUser} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post('/login', authUser)


export default router   
