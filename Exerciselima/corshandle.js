const express = require("express");
const cors = require("cors");

const app = express();

// enable CORS
app.use(cors());

// route for getting all users
app.get("/users", (req, res) => {
  // get users logic here
  res.send([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
