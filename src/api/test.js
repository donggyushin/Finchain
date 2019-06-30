import express from 'express'
import { testGet, testPost } from '../controller/test'
import multer from 'multer'
const upload = multer()
const router = express.Router()

router.get('/', testGet)
router.post('/', upload.array(), testPost)

export default router