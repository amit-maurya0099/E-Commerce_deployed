const express=require("express");
const {createProduct, getAllProducts, updateProductById, deleteProductById, getProductDetail, createProductReview, getAllReviewsByProductId, deleteReview, getAdminProducts, getQueryProducts} = require("../controllers/product-controller");
const {isAuthenticated,authorizeRole} = require("../middlewares/auth_middleware");

const router=express.Router();

router.route("/product/new").post(isAuthenticated,authorizeRole("admin"),createProduct);
router.route("/admin/products").get(isAuthenticated,authorizeRole("admin"),getAdminProducts);
router.route("/products").get(getAllProducts)
router.route("/product/update/:id").put(isAuthenticated,authorizeRole("admin"),updateProductById)
router.route("/product/delete/:id").delete(isAuthenticated,authorizeRole("admin"),deleteProductById)
router.route("/product/details/:id").get(getProductDetail)
router.route("/product/review").post(isAuthenticated,createProductReview).delete(isAuthenticated,deleteReview);
router.route("/product/reviews").get(isAuthenticated,getAllReviewsByProductId);
router.route("/products/query").get(getQueryProducts);




module.exports=router;