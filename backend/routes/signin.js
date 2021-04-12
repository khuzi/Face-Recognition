const express = require("express");

const router = express.Router();

const signin = (database) => {
  return router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    let dt_user = null;
    database.users.forEach((user) => {
      if (user.email === email && user.password === password) {
        dt_user = user;
      }
    });
    if (dt_user) {
      res.status(200).json({
        message: "login success",
      });
    } else {
      res.status(400).json("login failed");
    }
  });
};

module.exports = signin;
