const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware untuk mencatat log
app.use(morgan("dev"));

// Middleware untuk mengubah request body menjadi json
app.use(express.json());

// Array object users
const users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Smith",
  },
  {
    id: 3,
    name: "Bob",
  },
];

// GET: /users endpoint untuk memberikan list data users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET: /users/:name endpoint untuk memberikan data user sesuai dengan permintaan client
app.get("/users/:name", (req, res) => {
  const user = users.find(
    (u) => u.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      status: "error",
      message: "Data user tidak ditemukan",
    });
  }
});

// Penanganan Routing 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Penanganan Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

// Mulai server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
