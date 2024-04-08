const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
