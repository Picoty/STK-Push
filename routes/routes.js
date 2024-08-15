const router = require("express").Router()
const {Home,stk,callback} = require("../controllers/mpesa")
const generateToken = require("../config/tk")

router.get("/",Home)
  
router.post("/stk",generateToken,stk )
router.post("/callback", callback)

module.exports = router 