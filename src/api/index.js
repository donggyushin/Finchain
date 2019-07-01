import express from 'express'
import testRouter from "./test"
import userRouter from './user'

const router = express.Router()
router.use('/test', testRouter)
router.use('/user', userRouter)

export default router