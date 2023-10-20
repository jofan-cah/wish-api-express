module.exports = app => {
    const users = require("../controller/users.controller")
    const router = require("express").Router()
    const db = require("../models")
    const Users = db.users

    const {verifyToken, checkRoleMiddleware} =  require('../midleware/authMidleware')
    const  {body}  = require('express-validator');
// Untuk latihan ALL data user, role adalah user  kalo sudah deploy maka admin
    router.get("/",users.findAll);
    router.get("/:id", verifyToken , users.show);
    // router.post("/", verifyToken , users.create);
    router.put("/:id", verifyToken ,
    [
        // Validasi email, harus berupa email yang valid
        body('email')
          .isEmail()
          .withMessage('Email tidak valid')
          .custom(async (value, { req }) => {
            // Cek apakah email sudah digunakan sebelumnya, kecuali jika ID sama
            const existingUser = await Users.findOne({ email: value });
            if (existingUser && existingUser.id.toString() !== req.params.id) {
              throw new Error('Email sudah digunakan');
            }
            return true;
          }),
    
        // Validasi nomor hp, tidak boleh sama
        body('phone')
      .custom(async (value, { req }) => {
        // Cek apakah nomor hp sudah digunakan sebelumnya, kecuali jika ID sama
        const existingUser = await Users.findOne({ phone: value });
        if (existingUser && existingUser.id.toString() !== req.params.id) {
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
        body('name').notEmpty().withMessage('Name harus diisi'),
        body('birthday').notEmpty().withMessage('Tanggal lahir harus diisi')
          .isDate().withMessage('Format tanggal lahir tidak valid'),
    ]
      , checkRoleMiddleware("user") , users.update);
    router.delete("/:id", verifyToken ,users.delete);

    app.use("/users",router)

}