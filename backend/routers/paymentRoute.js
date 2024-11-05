const express =require('express');
const router=express.Router();
const {processPayment, sendStripeApiKey}= require("../controllers/payment-controller");
const { isAuthenticated } = require('../middlewares/auth_middleware');

router.route("/payment").post(isAuthenticated,processPayment);
router.route("/stripeapikey").get(isAuthenticated,sendStripeApiKey);

module.exports=router;
