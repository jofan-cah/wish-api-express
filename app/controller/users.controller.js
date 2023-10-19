const db = require("../models")
const Users = db.users
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');


exports.create = (req,res) => {

    req.body.birthday = new Date(req.body.birthday)
    req.body.password =  bcrypt.hash(req.body.password, 10);


    Users.create(req.body)
    .then(()=> res.status(201).json({message : "Data Berhasil Di Tambah"}))
    .catch  (err => res.status(500).send({mesagge :err.mesagge,status : res.status(500)}))

// return    res.status(201).json({message : "Berhasil Menambahkan"})
}

exports.findAll = (req,res) => {
    
    Users.find()
    .then(data => res.status(200).json({message: "menampilkan Data",data: data }))
    .catch(err => res.status(500).send({mesagge :err.mesagge}))

}

exports.show = (req,res) => {
    const id = req.params.id;
    Users.findById(id)
    .then(data=> res.status(200).json({mesagge: `Berhasil Menemukan ${id}`,data : data}))
    .catch(err=> res.status(404).send({message: err.message}))

}

exports.update =async (req,res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Coba cek kembali data anda", status: 400, errors: errors.array() });
    }
  
    const { id } = req.params;
    const { email, phone, password, gender } = req.body;
  
    try {
      // Temukan pengguna berdasarkan ID
      const user = await Users.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan", status: 404 });
      }
  
      // Validasi nomor hp, jika diubah
      if (phone !== user.phone) {
        const existingPhone = await Users.findOne({ phone });
        if (existingPhone) {
          return res.status(400).json({ message: 'Nomor hp sudah digunakan', status: 400 });
        }
      }
  
      // Validasi password, jika diubah
      if (password) {
       
  
        // Mengenkripsi kata sandi yang baru jika diubah
        req.body.password = await bcrypt.hash(password, 10);
      }
  
      // Perbarui data pengguna
      await Users.findByIdAndUpdate(id, req.body);
  
      res.status(200).json({ message: "Data pengguna berhasil diperbarui", status: 200 });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat memperbarui data pengguna", status: 500 });
    }

    

}

exports.delete = (req,res) => {

    const id = req.params.id;

    Users.findByIdAndRemove(id)
    .then(data=> {
        if(!data){
            res.status(500).json({message : "ID Tidak Ditemukan"})
        }

        res.status(200).json({
            message: "Berhasil Menghapus",

        })
    })
    .catch(err => res.status(500).send({message: err.message}))

}

