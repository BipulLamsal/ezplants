const express = require("express");
const router = express.Router();
const transactionController = require("../Controllers/transaction.controller");
const { authenticateJWT } = require("../Middlewares/auth.middleware");

router.post(
  "/create",
  authenticateJWT,
  transactionController.createTransactions
);
router.get("/", transactionController.getAllTransactions);
module.exports = router;
