const express = require("express");

const router = express.Router();

const register = (database) => {
  return router.post("/register", (req, res) => {
    const { email, password, name } = req.body;
    database.users.push({
      id: "125",
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    });
    res.json({
      message: "new user added",
      user: database.users[database.users.length - 1],
    });
  });
};

module.exports = register;
