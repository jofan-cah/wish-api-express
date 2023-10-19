module.exports = app => {
const express = require('express');
const router = express.Router();
const { body , validationResult} = require('express-validator');
const AuthController = require('../controller/auth.controller');
const db = require("../models")
const Users = db.users
const Admins = db.admins

router.post(
  "/register",
  [
    // Validasi email, harus berupa email yang valid
    body('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .custom(async (value, { req }) => {
        // Cek apakah email sudah digunakan sebelumnya
        const existingUser = await Users.findOne({ email: value });
        if (existingUser) {
          throw new Error('Email sudah digunakan');
        }
        return true;
      }),

    // Validasi nomor hp, tidak boleh sama
    body('phone')
      .custom(async (value, { req }) => {
        // Cek apakah nomor hp sudah digunakan sebelumnya
        const existingUser = await Users.findOne({ phone: value });
        if (existingUser) {
          throw new Error('Nomor hp sudah digunakan');
        }
        return true;
      }),

    // Validasi data yang harus diisi
    body('password')
      .notEmpty()
      .withMessage('Kata sandi harus diisi')
      .isLength({ min: 6 })
      .withMessage('Kata sandi harus memiliki panjang minimal 6 karakter')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage('Kata sandi harus mengandung setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus')
      .custom((value, { req }) => {
        // Validasi bahwa kata sandi tidak sama dengan email
        if (value === req.body.email) {
          throw new Error('Kata sandi tidak boleh sama dengan email');
        }
        return true;
      }),
    body('gender').notEmpty().withMessage('Jenis kelamin harus diisi'),
    body('phone').notEmpty().withMessage('Nomer Hp harus diisi'),
    body('name').notEmpty().withMessage('Name harus diisi'),
    body('birthday').notEmpty().withMessage('Tanggal lahir harus diisi')
      .isDate().withMessage('Format tanggal lahir tidak valid'),
  ],
  AuthController.registerUser
);



// Masuk (Login)
router.post('/login', [
     // Validasi email, harus berupa email yang valid
     body('email')
     .isEmail()
    //  .withMessage('Email tidak valid')
   ,
    //  validasi Body password
     body('password')
     .notEmpty()
     .withMessage('Kata sandi harus diisi')
     .custom((value, { req }) => {
       // Validasi bahwa kata sandi tidak sama dengan email
       if (value === req.body.email) {
         throw new Error('Kata sandi tidak boleh sama dengan email');
       }
       return true;
     }),
], AuthController.loginUser );


router.post("/regist-admin",
[
  // Validasi email, harus berupa email yang valid
  body('email')
    .isEmail()
    .withMessage('Email tidak valid')
    .custom(async (value, { req }) => {
      // Cek apakah email sudah digunakan sebelumnya
      const existingUser = await Admins.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email sudah digunakan');
      }
      return true;
    }),

 

  // Validasi data yang harus diisi
  body('password')
    .notEmpty()
    .withMessage('Kata sandi harus diisi')
    .isLength({ min: 6 })
    .withMessage('Kata sandi harus memiliki panjang minimal 6 karakter')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage('Kata sandi harus mengandung setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus')
    .custom((value, { req }) => {
      // Validasi bahwa kata sandi tidak sama dengan email
      if (value === req.body.email) {
        throw new Error('Kata sandi tidak boleh sama dengan email');
      }
      return true;
    }),
  body('name').notEmpty().withMessage('Name harus diisi'),
  ], AuthController.registerAdmins
)

router.post("/login-admin",[
     // Validasi email, harus berupa email yang valid
     body('email')
     .isEmail()
    //  .withMessage('Email tidak valid')
   ,
    //  validasi Body password
     body('password')
     .notEmpty()
     .withMessage('Kata sandi harus diisi')
     .custom((value, { req }) => {
       // Validasi bahwa kata sandi tidak sama dengan email
       if (value === req.body.email) {
         throw new Error('Kata sandi tidak boleh sama dengan email');
       }
       return true;
     }),
], AuthController.loginAdmins)

router.post('/logout', (req, res) => {
  // Hapus token dari cookie
  res.clearCookie('token');
  res.json({ message: 'Logout berhasil' });
});

app.use("/auth",router)


module.exports = router;

}