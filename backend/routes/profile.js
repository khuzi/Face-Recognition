const express = require("express");

const routrer = express.Router();

const profile = (database) => {
  return routrer.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach((user) => {
      if (user.id === id) {
        found = true;
        return res.status(200).json({ message: "user found", user });
      }
    });
    if (!found) {
      res.json("no such user");
    }
  });
};

module.exports = profile;
