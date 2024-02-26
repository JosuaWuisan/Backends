const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "localhost"; // Add your desired hostname here

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS
app.use(cors());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Route for uploading a file
app.post("/upload", upload.single("file"), (req, res) => {
  res.send(`File ${req.file.originalname} uploaded successfully`);
});

// Route for getting all users
app.get("/users", (req, res) => {
  // Get users logic here
  res.send([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ]);
});

// Route for creating a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  // Create user logic here
  res.send(`User ${name} created with email ${email}`);
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
