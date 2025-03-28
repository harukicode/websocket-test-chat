const express = require("express");
const session = require("express-session");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resalve: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
  }),
);

app.get("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
