const hostname = '127.0.0.1';
const port = '3000';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const db = require('./db');

// Middleware untuk logging informasi tentang request ke server
app.use(morgan('dev'));

// Middleware untuk meng-handle data dari form-urlencoded dan json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Menampilkan data dari tabel students di PostgreSQL
app.get('/', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * 
            FROM students
            ORDER BY id ASC`
        );
        res.status(200).json({
            status: 'success',
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Menambahkan data ke dalam tabel students di PostgreSQL
app.post('/students', async (req, res) => {
    const { name, address } = req.body;
    try {
        const result = await db.query(
            `INSERT into students (name, address)
            values ('${name}', '${address}')`
        );
        res.status(200).json({
            status: 'Success',
            message: 'Data berhasil dimasukkan',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Menampilkan data dari tabel students di PostgreSQL berdasarkan ID
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(
            `SELECT * FROM students WHERE id = '${id}'`
        );
        if (result.rows.length === 0) {
            res.status(404).json({
                status: 'Gagal',
                message: 'Tidak ada data untuk ID ini',
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'Data berhasil diambil',
                data: result.rows,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal mengambil data');
    }
});

// Mengupdate data di tabel students di PostgreSQL berdasarkan ID
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).send('Mohon berikan nama dan alamat');
    }

    try {
        const result = await db.query(
            `UPDATE students
            SET name= '${name}', address= '${address}'
            WHERE id = '${id}'`
        );
        res.status(200).json({
            status: 'Success',
            message: 'Data berhasil diupdate',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal mengupdate data students');
    }
});

// Menghapus data dari tabel students di PostgreSQL berdasarkan ID
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(
            `DELETE FROM students
            WHERE id = '${id}'`
        );
        res.status(200).json({
            status: 'Success',
            message: 'Data berhasil dihapus dari tabel',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal menghapus data student');
    }
});

// Middleware untuk menangani kasus ketika resource tidak ditemukan
app.use((req, res, next) =>
    res.status(404).json({
        status: 'Error',
        message: 'Resource tidak ditemukan',
    })
);

// Server mendengarkan pada port dan hostname tertentu
app.listen(port, () =>
    console.log(`Server berjalan di http://${hostname}:${port}`)
);
