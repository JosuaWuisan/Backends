const express = require("express");
const multer = require("multer");

const app = express();

// configure multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// create multer instance
const upload = multer({ storage });

// route for uploading a file
app.post("/upload", upload.single("file"), (req, res) => {
  res.send(`File ${req.file.originalname} uploaded successfully`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
