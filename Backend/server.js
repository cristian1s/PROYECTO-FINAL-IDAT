const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.URL_FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);

fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Client IP address:", data.ip);
  })
  .catch((error) => {
    console.error("Error fetching IP address:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
