// require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogentryRouter = require('./controllers/blogentries')
const mongoose = require('mongoose')


const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogentryRouter)


module.exports = app