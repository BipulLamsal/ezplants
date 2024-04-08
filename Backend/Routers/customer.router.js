const express = require("express");
const router = express.Router();
const customerAuthController = require("../Controllers/customer.auth.controller");
const { authenticateJWT } = require("../Middlewares/auth.middleware");
router.post("/register", customerAuthController.createCustomer);
router.post("/checkauth", authenticateJWT, customerAuthController.authCustomer);
router.post(
  "/checkAdminAuth",
  authenticateJWT,
  customerAuthController.authAdminMiddleware,
  customerAuthController.authAdmin
);
router.post("/login", customerAuthController.loginCustomer);
module.exports = router;
