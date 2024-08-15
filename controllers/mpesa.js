const shortcode = process.env.shortcode
const passKey = process.env.pass_key
const date = new Date();
const timestamp = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);

const password = new Buffer.from(shortcode + passKey + timestamp).toString("base64");

const  axios  = require("axios")
const paymentschema = require("../models/payment")
const mongoose = require("mongoose")
const paymentModel = mongoose.model("Picoty", paymentschema)


const Home = (req , res) => {
    res.json("Home route")
}
const stk =async(req, res) => {
    const phone = req.body.phone.substring(1)
    const amount = req.body.amount
    console.log(req.body)   
     await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {    
            "BusinessShortCode": shortcode,    
            "Password": password,    
            "Timestamp": timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA": `254${phone}`,    
            "PartyB": shortcode,    
            "PhoneNumber":`254${phone}`,    
            "CallBackURL": "https://3cb3-196-250-215-164.ngrok-free.app/callback",    
            "AccountReference":"Test",    
            "TransactionDesc":"Test"
         },
         {headers:{
            authorization:`Bearer ${token}`
         }}


    )
    .then((data)=>{res.status(200).json(data.data)})
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error.message)})
    
}

const callback = async(req, res)=>{
    const callbackdata = req.body
    if (!callbackdata.Body.stkCallback.CallbackMetadata){
        return res.json("Transaction not completed")
    }
    const phone = callbackdata.Body.stkCallback.CallbackMetadata.Item[4].Value
    const amount = callbackdata.Body.stkCallback.CallbackMetadata.Item[0].Value
    const transactionid = callbackdata.Body.stkCallback.CallbackMetadata.Item[3].Value
    let payment = new paymentModel()
    payment.phone = phone
    payment.amount = amount
    payment.transacionid = transactionid
    try{
        await payment.save()
    }catch (error){
        console.log(error.message)
    }
}

module.exports ={Home , stk , callback}