const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  transactionDateTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  approveStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
