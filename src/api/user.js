import express from 'express';
import multer from 'multer'
import { newAccount, login, userInfo } from '../controller/user';

const upload = multer()
const router = express.Router()

// New Account
router.post('/new-account', upload.array(), newAccount)


// Login
router.post('/login', upload.array(), login)

// Show users info
router.get('/', userInfo)

export default router;