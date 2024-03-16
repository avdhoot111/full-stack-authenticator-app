import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES ?";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error for hashing password' });
        }
        const values = [
            [req.body.name, req.body.email, hash]
        ];
        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ Error: 'Error while inserting' });
            }
            return res.status(200).json({ Status: 'Success' });
        });
    });
});

app.listen(7000, () => {
    console.log('Running......!!');
})