import express from "express"
import API from './api'
const app = express()
// For parsing application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API router
app.use('/api', API)



export default app;