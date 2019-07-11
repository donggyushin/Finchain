import express from 'express';
import multer from 'multer'
import { newAccount, login, userInfo, checkAdmin, changePassword } from '../controller/user';

const upload = multer()
const router = express.Router()

// New Account
router.post('/new-account', upload.array(), newAccount)


// Login
router.post('/login', upload.array(), login)

// Show users info
router.get('/', userInfo)

// Show user is admin or not
router.get('/admin', checkAdmin)

// Change user password
router.post('/change-password', upload.array(), changePassword);

export default router;