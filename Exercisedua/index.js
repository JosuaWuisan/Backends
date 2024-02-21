const express = require("express");
const morgan = require("morgan");
const members = require("./members");

const app = express();

// Middleware untuk Log (Morgan)
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const jsonResponse = {
    status: "success",
    message: "response success",
  };

  res.json(jsonResponse);
});

const hostname = "127.0.0.1"; // atau localhost
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server sedang running di http://${hostname}:${port}/`);
});
