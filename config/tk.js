const axios = require("axios");

const generateToken = async (req, res, next) => {
    const secrete = process.env.consumer_secret;
    const consumerkey = process.env.consumer_key;
    const auth = new Buffer.from(`${consumerkey}:${secrete}`).toString("base64");
    await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        headers: {
            authorization: `Basic ${auth}`
        }
    }).then((response) => {
        token = response.data.access_token;
        next();
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = generateToken;