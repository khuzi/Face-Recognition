const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const signin = require("./routes/signin");
const register = require("./routes/register");
const profile = require("./routes/profile");
const image = require("./routes/image");

const app = express();
const port = 3000;
const database = {
  users: [
    {
      id: "123",
      name: "khuzaima",
      email: "khuzaima@gmail.com",
      password: "090078601",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "mohsin",
      email: "mohsin@gmail.com",
      password: "mohsin12345",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.use(signin(database));
app.use(register(database));
app.use(profile(database));
app.use(image(database));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "It works",
    users: database.users,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
