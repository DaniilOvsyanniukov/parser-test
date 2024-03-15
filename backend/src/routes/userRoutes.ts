import express from 'express'
import { getUserById } from '../controllers/authController'

const router = express.Router()

router.get('/:id', getUserById)

export default router