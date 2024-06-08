require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./src/users");
const Cart = require("./src/cart");
const connectDb = require("./src/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const PORT = 4000;

connectDb();
app.use(
  cors({
    origin: ["http:localhost:4000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

let refreshTokens = [];

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const isMatched = await user.comparePassword(password);
    if (isMatched) {
      const { accessToken } = generateTokens(user);
      res
        .status(202)
        .cookie("token", accessToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 15 * 60 * 1000),
          secure: true,
          httpOnly: false,
        })
        .send("cookie sent");
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.post("/register", async function (req, res) {
  try {
    const query = await User.find({ email: req.body.email });
    if (query.length >= 1) {
      return res.sendStatus(403);
    }

    var new_user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
    });

    new_user.password = new_user.generateHash(req.body.password);
    new_user.save();

    const { accessToken } = generateTokens(req.body);
    res
      .status(202)
      .cookie("token", accessToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 15 * 60 * 1000),
        secure: true,
        httpOnly: false,
      })
      .send("cookie sent");

    res.json(tokens);
  } catch (err) {
    console.log(err);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const items = req.body.cartItems;
  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images: [item.product.image],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/cart`,
  });

  res.json({ url: session.url });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.status(202).clearCookie("token");
  res.sendStatus(204);
});

app.get("/getUserCart", async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email: email });
  const cart = await Cart.find({ userID: user._id });

  res.json(cart);
});

app.post("/addToUserCart", async (req, res) => {
  const { email, productID } = req.body;
  const user = await User.findOne({ email: email });

  var cart_entry = new Cart({
    userID: user._id,
    productID: productID,
  });

  cart_entry.save();

  res.sendStatus(202);
});

app.delete("/removeFromUserCart", async (req, res) => {
  const { email, productID } = req.body;
  const user = await User.findOne({ email: email });

  const results = await Cart.deleteOne({
    userID: user._id,
    productID: productID,
  });

  if (results.acknowledged === true) {
    res.sendStatus(202);
  }
});

function generateTokens(user) {
  const userInfo = {
    name: user.name,
    email: user.email,
  };

  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);

  refreshTokens.push(refreshToken);

  return { accessToken: accessToken, refreshToken: refreshToken };
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log("Auth Server is running on Port " + PORT));
});

module.exports = app;
