const db = require("../models")
const Admins = db.admins
const bcrypt = require('bcrypt')
const {validationResult} = require("express-validator")

exports.create = async (req,res) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;
    
        Admins.create(req.body)
          .then(() => res.status(201).json({ message: "Data Berhasil Ditambahkan", status: 201 }))
          .catch(err => res.status(500).json({ message: err.message, status: 500 }));
      } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan dalam mengenkripsi kata sandi", status: 500 });
      }
    }
    

exports.findAll = (req,res) => {
  
    try {
        Admins.find()
        .then(data => res.status(200).send({message : "Berhasil Mengambil Semua Data", data : data , } ))
        .catch(err => res.json({message: err.message,status:500}))
      } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan dalam mengenkripsi kata sandi", status: 500 });
      }
}
    


exports.show = (req,res) => {

    try {
        const id = req.params.id
        Admins.findById(id)
        .then(data => res.status(200).send({message : "Berhasil Menemukan",data : data}) )
        .catch(err => res.status(401).send({message: err.message
        }))
      } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan dalam mengenkripsi kata sandi", status: 500 });
      }

}

exports.update = async (req,res) => {

    const errors = validationResult(req)
    const id = req.params.id

    const { email, name, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Coba Cek Kembali Data Anda", status : 400, errors:errors.array()})
    }

    try {
        // Temukan pengguna berdasarkan ID
        const admins = await Admins.findById(id);
    
        if (!admins) {
          return res.status(404).json({ message: "Pengguna tidak ditemukan", status: 404 });
        }
    
 
        // Validasi password, jika diubah
        if (password) {
    
          // Mengenkripsi kata sandi yang baru jika diubah
          req.body.password = await bcrypt.hash(password, 10);
        }
    
        // Perbarui data pengguna
        await Admins.findByIdAndUpdate(id, req.body);
    
        res.status(200).json({ message: "Data pengguna berhasil diperbarui", status: 200 });
      } catch (error) {
        console.error("Error while updating user:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui data pengguna", status: 500 });
      }
}

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Admins.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          return res.status(500).send({ message: "Data Tidak Ditemukan" });
        }
        return res.status(200).json({
          message: "Berhasil Menghapus"
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  