const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 1984;

// application
const app = express();

//cors setup
app.use(express.json());
const corsOptions = {
  origin: ["*", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));
//routes
const customerRoutes = require("./Routers/customer.router");
const plantRoutes = require("./Routers/plant.router");
const transactionRoutes = require("./Routers/transaction.router");
app.use("/api/customers", customerRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/transaction", transactionRoutes);

//mongodb connection
const mongoURI = process.env.URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to the databse");
    app.listen(PORT, () => {
      console.log("server running at port number : ", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the db - ", err);
  });
