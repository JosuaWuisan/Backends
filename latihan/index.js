const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3000;
const hostname = "127.0.0.1";

// //middleware
// //log
// app.use((req, res, next) => {
//   console.log(`${Date.now()} - ${req.ip} - ${req.originalUrl}`);
//   next();
// });
app.use(morgan("tiny"));
//route
app.get("/", (req, res) => res.send("Hellow world"));
app.get("/about", (req, res) =>
  res.status(400).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
app.post("/contoh", (req, res) => {
  res.send("Request dengan method POST");
});

app.put("/contoh", (req, res_) => {
  res.send("Request dengan method PUT");
});
app.patch("/contoh", (req, res_) => {
  res.send("Request dengan method PATCH");
});
app.delete("/contoh", (req, res_) => {
  res.send("Request dengan method DELETE");
});

app.post("/post/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Post dengan ID ${id}`);
});
app.post("/post", (req, res) => {
  const data = req.query;
  res.send(`Post dengan data page ${data.page}`);
});

//middleware not found

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
  next();
});
app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
