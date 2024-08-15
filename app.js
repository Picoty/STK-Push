const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()
const port = process.env.port
const app = express()
const router = require("./routes/routes")
const db = require("./config/db")

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",router)

app.listen(port,()=>console.log(`app runnning on port ${port}`))