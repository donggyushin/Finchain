import jwt from 'jsonwebtoken'

export const generateToken = async (identifier) => {
    try {
        var token = await jwt.sign({ identifier }, 'she')
        return token
    } catch (err) {
        return null;
    }
}

export const decodeToken = async (token) => {
    try {
        var decoded = await jwt.verify(token, 'she')
        var identifier = decoded.identifier
        return identifier
    } catch (err) {
        return null;
    }


}