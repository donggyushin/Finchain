import express from "express"
import API from './api'
import path from 'path'
const app = express()
// For parsing application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get the frontend static file
console.log(__dirname)
app.use('/', express.static(path.join(__dirname, 'frontend/build')))


// API router
app.use('/api', API)



export default app;