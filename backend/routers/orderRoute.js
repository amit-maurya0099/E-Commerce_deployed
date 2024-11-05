const express=require("express");
const {isAuthenticated, authorizeRole}=require("../middlewares/auth_middleware");
const {newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder} = require("../controllers/order-controller");
const router=express.Router();

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/order/details/:id").get(isAuthenticated,getSingleOrder);
router.route("/order/me").get(isAuthenticated,myOrder);
router.route("/order/all").get(isAuthenticated,authorizeRole("admin"),getAllOrders);
router.route("/order/update/:id").put(isAuthenticated,authorizeRole("admin"),updateOrder);
router.route("/order/delete/:id").delete(isAuthenticated,authorizeRole("admin"),deleteOrder);

module.exports=router;