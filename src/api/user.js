import express from 'express';
import multer from 'multer'
import { newAccount, login } from '../controller/user';

const upload = multer()
const router = express.Router()

// New Account
router.post('/new-account', upload.array(), newAccount)


// Login
router.get('/login', upload.array(), login)

export default router;