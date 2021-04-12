const express = require("express");

const router = express.Router();

const image = (database) => {
  return router.post("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach((user) => {
      if (user.id === id) {
        found = true;
        user.entries++;
        return res
          .status(200)
          .json({ message: "entries increased", entries: user.entries });
      }
    });
    if (!found) {
      res.json("no such user");
    }
  });
};

module.exports = image;
