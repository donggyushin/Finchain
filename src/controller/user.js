import User from '../model/user'

export const login = (req, res) => {
    const { username, password } = req.body

    // Find user with username and password
    User.findOne({ where: { username, password } }).then(user => {
        // If there is, send ok and token
        if (user != null) {
            res.json({
                ok: true,
                message: null,
                jwt: "jwt"
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
    const { username, password } = req.body
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
            User.findOrCreate({ where: { username, password } }).then(
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