const mongoose = require("mongoose")
const paymentschema = new mongoose.Schema({
    phone:{
        type: String, required:true
    },
    amount:{
        type: String, required: true

    },
    transactionid:{
        type: String, required: true
    }
})
module.exports = paymentschema