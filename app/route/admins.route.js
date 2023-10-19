module.exports = app => {
    const admins = require('../controller/admins.controller')
    const router = require("express").Router()
    const db = require("../models")
    const Admins = db.admins

    const {verifyToken,checkRoleMiddleware} = require("../midleware/authMidleware")
    const {body} = require("express-validator")

    router.get("/" , verifyToken, checkRoleMiddleware("admin"), admins.findAll);
    router.get("/:id" , checkRoleMiddleware("admin"), verifyToken, admins.show);
    router.post("/", verifyToken , admins.create);
    router.put("/:id"  , verifyToken  , checkRoleMiddleware("admin"),
    [
        // Validasi email, harus berupa email yang valid
        body('email')
          .isEmail()
          .withMessage('Email tidak valid')
          .custom(async (value, { req }) => {
            // Cek apakah email sudah digunakan sebelumnya, kecuali jika ID sama
            const existingUser = await Admins.findOne({ email: value });
            if (existingUser && existingUser.id.toString() !== req.params.id) {
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
    ]
    ,admins.update);
    router.delete("/:id" , verifyToken , checkRoleMiddleware("admin"), admins.delete)

    app.use("/admins",router)
}