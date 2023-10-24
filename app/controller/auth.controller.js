const db = require("../models")
const Users = db.users
const Admins = db.admins
const bcrypt = require('bcrypt');
const { body , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const  dotenv  = require("dotenv");
dotenv.config();

const aksesJwt = process.env.ACCESS_TOKEN_SECRET

exports.registerUser = async (req, res) =>
    {
     const errors = validationResult(req);
     
     if (!errors.isEmpty()) {
         return res.status(400).json({ message : "Coba cek kembali data anda", status : 400, errors: errors.array()});
     }
   
     try {
         // Mengenkripsi kata sandi yang ada dalam req.body.password
         req.body.password = await bcrypt.hash(req.body.password, 10);
         req.body.birthday = new Date(req.body.birthday)
   
         Users.create(req.body)
             .then(() => res.status(201).json({ message: "Data Berhasil Di Tambah" }))
             .catch(err => res.status(500).send({ message: err.message }));
     } catch (error) {
         // Tangani kesalahan dengan mengirim tanggapan kesalahan
         res.status(500).send({ message: "Terjadi kesalahan saat mengenkripsi kata sandi." });
     }
   }


exports.loginUser = async (req,res) => {

    const errors = validationResult(req);     
    if (!errors.isEmpty()) {
        return res.status(401).json({ message : "Coba cek kembali data anda", status : 400, errors: errors.array()});
    }

    try {
        const { email, password } = req.body;
    
        // Cari pengguna berdasarkan email
        const user = await Users.findOne({ email });
    
        if (!user) {
        return res.status(401).json({ error: 'Email atau kata sandi salah.', });
        }
    
        // Bandingkan kata sandi yang di-hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Email atau kata sandi salah.' });
        }
    
        // Buat token JWT
        const token = jwt.sign({ userId: user.id  , email:user.email , role : user.role}, aksesJwt, { expiresIn: '1h' });
        res.json({Message : "Berhasil Login", token ,role:user.role});
    
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat masuk.' });
    }
    }

exports.registerAdmins = async (req,res) =>  {
    const errors = validationResult(req);
     
    if (!errors.isEmpty()) {
        return res.status(400).json({ message : "Coba cek kembali data anda", status : 400, errors: errors.array()});
    }
  
    try {
        // Mengenkripsi kata sandi yang ada dalam req.body.password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        Admins.create(req.body)
            .then(() => res.status(201).json({ message: "Data Berhasil Di Tambah" }))
            .catch(err => res.status(500).send({ message: err.message }));
    } catch (error) {
        // Tangani kesalahan dengan mengirim tanggapan kesalahan
        res.status(500).send({ message: "Terjadi kesalahan saat mengenkripsi kata sandi." });
    }
}


exports.loginAdmins = async (req,res) => {
    const errors = validationResult(req);     
    if (!errors.isEmpty()) {
        return res.status(400).json({ message : "Coba cek kembali data anda", status : 400, errors: errors.array()});
    }

    try {
        const { email, password } = req.body;
    
        // Cari pengguna berdasarkan email
        const user = await Admins.findOne({ email });
    
        if (!user) {
        return res.status(401).json({ error: 'Email atau kata sandi salah.', });
        }
    
        // Bandingkan kata sandi yang di-hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Email atau kata sandi salah.' });
        }
    
        // Membuat objek pengguna tanpa password dan _id
        const userWithoutSensitiveData = {
        id: user.id,
        email: user.email,
        password: "******" ,
        name: user.name,

        };
    
        // Buat token JWT
        const token = jwt.sign({ userId: user.id, email:user.email  , role: user.role}, aksesJwt, { expiresIn: '1h' });
        res.json({Message : "Berhasil Login",  token });
    
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat masuk.' });
    }
}


