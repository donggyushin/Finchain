import User from '../model/user'
import { generateToken } from '../utils/jsonwebtoken';

export const userInfo = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json({
            ok: true,
            message: "",
            users
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            message: "유저 정보를 받아오는데에 문제가 생겼습니다. ",
            users: null
        })
    }
}

export const login = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body

    // Find user with username and password
    User.findOne({ where: { username, password } }).then(async user => {
        // If there is, send ok and token
        if (user != null) {
            const userIdentifier = user.identifier;
            console.log(userIdentifier)
            const jwt = await generateToken(userIdentifier)
            res.json({
                ok: true,
                message: null,
                jwt
            })
        } else {
            // Else, error message
            res.json({
                ok: false,
                message: "로그인에 실패하였습니다. ",
                jwt: null
            })
        }
    })
}

export const newAccount = (req, res) => {
    console.log(req.body)
    const { username, password, name, phoneNumber } = req.body
    // Check there is already username
    User.findOne({ where: { username } }).then(user => {
        // user will be the first entry of the User table with username
        // If there is, send error message
        if (user != null) {
            res.json({
                ok: false,
                message: "이미 존재하는 아이디입니다. "
            })
        } else {
            // Else, make new user 
            User.findOrCreate({ where: { username, password, name, phoneNumber } }).then(
                ([existingUser, created]) => {
                    if (created) {
                        res.json({
                            ok: true,
                            message: null
                        })
                    } else {
                        res.json({
                            ok: false,
                            message: "회원가입에 실패하였습니다. "
                        })
                    }
                }
            )
        }


    })



}