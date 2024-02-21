const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// route for creating a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  // create user logic here
  res.send(`User ${name} created with email ${email}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
