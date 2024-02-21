const express = require("express");
const app = express();
const members = require("./members");
const users = require("./users");

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/about", (req, res) => {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Makassar",
  };

  const isoDate = date.toISOString();
  const formattedDate = date.toLocaleString("id-ID", options);

  res.json({
    status: "success",
    message: "response success",
    description: "Exercise #03",
    date: isoDate,
    formattedDate: formattedDate,
    data: members,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
