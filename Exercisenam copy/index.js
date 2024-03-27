// Menambahkan dependensi
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public" });
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

// Membuat instance PrismaClient
const prisma = new PrismaClient();

// Menggunakan middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// Menentukan direktori statis
app.use(express.static(path.join(__dirname, "public")));

// Mendapatkan semua data student
app.get("/students", async (req, res) => {
  try {
    // Query untuk mendapatkan semua data student
    const allStudents = await prisma.students.findMany();

    // Mengembalikan response dengan status 200 dan data student
    res.status(200).json({
      status: "success",
      data: allStudents,
    });
  } catch (err) {
    // Menangkap error dan mengembalikan response dengan status 500
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Menambahkan data student
app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    // Query untuk menambahkan data student
    const student = await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });

    // Mengembalikan response dengan status 201 dan data student
    res.status(201).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    // Menangkap error dan mengembalikan response dengan status 500
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Mendapatkan data student berdasarkan ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Query untuk mendapatkan data student berdasarkan ID
    const student = await prisma.students.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Mengecek apakah data student ditemukan
    if (student) {
      // Mengembalikan response dengan status 200 dan data student
      res.status(200).json({
        status: "success",
        data: student,
      });
    } else {
      // Mengembalikan response dengan status 404 dan pesan "Data not found"
      res.status(404).send("Data not found");
    }
  } catch (err) {
    // Menangkap error dan mengembalikan response dengan status 500
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Memperbarui data student berdasarkan ID
// Memperbarui data student berdasarkan ID
app.put("/students/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    try {
      // Query untuk memperbarui data student berdasarkan ID
      const student = await prisma.students.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          address: address,
        },
      });
  
      // Mengecek apakah data student ditemukan
      if (student) {
        // Mengembalikan response dengan status 200 dan data student
        res.status(200).json({
          status: "success",
          message: "Data berhasil diperbarui",
          data: student,
        });
      } else {
        // Mengembalikan response dengan status 404 dan pesan "Data not found"
        res.status(404).send("Data not found");
      }
    } catch (err) {
      // Menangkap error dan mengembalikan response dengan status 500
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });