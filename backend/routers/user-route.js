const express=require("express");
const {register,login, logout, forgotPassword, resetPassword, getUserDetails, userPasswordUpdate, updateProfile, getUserDetailsByID, getAllUsers, updateUserDetails, deleteUserById} = require("../controllers/user-controller");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth_middleware");
const router=express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/profile/details").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated,userPasswordUpdate);
router.route("/profile/update").put(isAuthenticated,updateProfile);

router.route("/details/all").get(isAuthenticated,authorizeRole("admin"),getAllUsers)
router.route("/details/:id").get(isAuthenticated,authorizeRole("admin"),getUserDetailsByID);
router.route("/details/update/:id").put(isAuthenticated,authorizeRole("admin"),updateUserDetails);
router.route("/delete/:id").delete(isAuthenticated,authorizeRole("admin"),deleteUserById);



module.exports=router;