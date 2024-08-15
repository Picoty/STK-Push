const mongoose = require("mongoose")
const dbConnect =mongoose.connect(process.env.DB_URL)
if (dbConnect){
    console.log("Successfully connecte to database")
}
else{
    console.log("An error has")
}
