const express = require('express');
const { updateProduct, createProduct, getAllProducts, deleteProduct, getProductDetails } = require('../controllers/productionController');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router