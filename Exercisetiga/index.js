const express = require("express");
const morgan = require("morgan");
const members = require("./members");
const users = require("./users");

const app = express();

// Middleware untuk Log (Morgan)
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/about", (req, res) => {
  const jsonResponse = {
    status: "success",
    message: "response success",
  };

  res.json(jsonResponse);
});

app.get("/users", (req, res) => {
  res.json(users);
});

const hostname = "127.0.0.1"; // atau localhost
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server sedang running di http://${hostname}:${port}/`);
});
