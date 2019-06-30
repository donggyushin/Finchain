import express from "express"
import API from './api'
const app = express()

// API router
app.use('/api', API)

// For parsing application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


export default app;