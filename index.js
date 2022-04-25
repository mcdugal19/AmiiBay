// This is the Web Server
require("dotenv").config();
const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(cors());

// enable stripe
// const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

//const calculateOrderAmount = (cart) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  //const {  }
 
  //return 1400;
//};

// app.post("/create-payment-intent", authRequired, async (req, res) => {
//   const { cart } = req.user;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "eur",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

server.use(cookieParser(process.env.COOKIE_SECRET));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./api"));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// bring in the DB connection
const { client } = require("./db");
// const { default: useAuth } = require("./src/hooks/useAuth");

// connect to the server
const PORT = process.env.PORT || 4000;

server.use((error, req, res, next) => {
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
