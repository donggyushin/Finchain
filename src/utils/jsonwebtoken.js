import jwt from 'jsonwebtoken'

export const generateToken = async (identifier) => {
    var token = await jwt.sign({ identifier }, 'she')
    return token
}

export const decodeToken = async (token) => {
    var decoded = await jwt.verify(token, 'she')
    var identifier = decoded.identifier
    return identifier
}