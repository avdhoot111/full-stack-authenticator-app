import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token, 'tokennnn')
    if(!token) {
        console.log('not token')
        return res.status(500).json({ Error: 'You are not authenticated' });
    }else {
        console.log('token')
        jwt.verify(token, "jwt-secrete-key", (err, decoded) => {
            if(err) {
                res.status(500).json({ Error: 'Token is not valid' });
            }else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

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

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) {
            return res.status(500).json({ error: 'Error for Login' });
        }
        if(data.length > 0) {
            console.log(req.body.password, data[0].password, 'input');
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                console.log(response, err, 'response');
                if(err) return res.json({Error: 'Hash Error'});
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, 'jwt-secrete-key', {expiresIn: '1d'} ) //write secrete key in env file in production and real world practices!
                    res.cookie('token', token)
                    return res.json({Status: "Success"});
                }else {
                    return res.json({Error: "Password does not match"})
                }
            })
        }else {
            return res.json({Error: 'No email found'})
        }
    })
})

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.listen(7000, () => {
    console.log('Running......!!');
})