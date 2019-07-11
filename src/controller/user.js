import User from '../model/user'
import { generateToken, decodeToken } from '../utils/jsonwebtoken';


export const checkAdmin = async (req, res) => {
    const token = req.header('token')
    const userPk = await decodeToken(token);

    try {
        const user = await User.findByPk(userPk);
        if (user == null) {
            res.json({
                ok: false,
                admin: false
            })
        } else {
            res.json({
                ok: true,
                admin: user.admin
            })
        }
    } catch (err) {
        res.json({
            ok: false,
            admin: false
        })
    }

}

export const changePassword = async (req, res) => {
    const { password } = req.body;

    try {

        const master = await User.findOne({
            where: {
                username: 'master'
            }
        })
        master.password = password;
        await master.save()
        res.json({
            ok: true,
            error: null
        })
    } catch (err) {
        res.json({
            ok: false,
            error: "비밀번호를 바꾸는데 실패하였습니다. "
        })
    }


}

export const userInfo = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['identifier', 'username', 'name', 'phoneNumber', 'createdAt', 'updatedAt', 'password'] })
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
                async ([user, created]) => {
                    if (created) {
                        if (user.username = "master") {
                            user.admin = true;
                            try {
                                await user.save()
                                res.json({
                                    ok: true,
                                    message: "master 계정 생성완료"
                                })
                            } catch (err) {
                                res.json({
                                    ok: true,
                                    message: "계정은 생성 됬지만, master 계정은 생성되지 않음. 이유 불명"
                                })
                            }
                        } else {
                            res.json({
                                ok: true,
                                message: null
                            })
                        }

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