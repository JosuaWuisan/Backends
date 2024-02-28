const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const users = require("./users");
const hostname = "127.0.0.1";
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  const user = users.find(
    (user) => user.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      status: "error",
      message: "user tidak ditemukan",
    });
  }
});

app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "error",
      message: "nama tidak boleh kosong",
    });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    status: "success",
    message: "gambar berhasil diupload",
  });
});

app.put("/users/:name", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (userIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "user tidak ditemukan",
    });
  }

  if (!req.body.name) {
    return res.status(400).json({
      status: "error",
      message: "nama tidak boleh kosong",
    });
  }

  users[userIndex].name = req.body.name;

  res.json({
    status: "success",
    message: "user berhasil diedit",
  });
});

app.delete("/users/:name", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (userIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "user tidak ditemukan",
    });
  }

  users.splice(userIndex, 1);

  res.json({
    status: "success",
    message: "user berhasil dihapus",
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);

app.use;
