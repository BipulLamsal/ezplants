const Customer = require("../Models/customer.model");
const Hash = require("../utility/hashing.utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createCustomer = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    const newCustomer = new Customer({
      fullname: fullname,
      email: email,
      password: await Hash.hashPassword(password),
    });
    const existingCustomer = await Customer.findOne({
      email,
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ status: false, msg: "Customer already Exists!" });
    }
    const savedCustomer = await newCustomer.save();
    return res.status(201).json({
      msg: `created user @${savedCustomer.fullname}`,
      status: true,
    });
  } catch (err) {
    return res.status(400).json({ status: false, msg: err.message });
  }
};
const loginCustomer = async (req, res) => {
  try {
    let { email, password } = req.body;
    const existingCustomer = await Customer.findOne({ email });
    if (!existingCustomer) {
      return { msg: `User not found`, status: false };
    }
    if (await Hash.comparePasswords(password, existingCustomer.password)) {
      const tokenPayload = {
        id: existingCustomer._id,
      };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      return res.status(201).json({
        msg: `@${existingCustomer.fullname} logged in!`,
        data: {
          token: accessToken,
          fullname: existingCustomer.fullname,
        },
        status: true,
      });
    } else {
      return res.status(400).json({
        msg: "Incorrect Password",
        status: false,
      });
    }
  } catch (err) {
    return res.status(401).json({
      msg: `User Not Found`,
      status: false,
    });
  }
};

const authCustomer = async (req, res) => {
  return res.json({ status: true });
};

const authAdminMiddleware = async (req, res, next) => {
  const existingCustomer = await Customer.findOne({ _id: req.user.id });

  if (!existingCustomer) {
    return res.status(401).json({ status: false });
  }
  if (existingCustomer.admin) {
    next();
  } else {
    return res.status(401).json({ status: false });
  }
};

const authAdmin = async (req, res) => {
  return res.status(201).json({ status: true });
};

module.exports = {
  createCustomer,
  loginCustomer,
  authCustomer,
  authAdmin,
  authAdminMiddleware,
};
