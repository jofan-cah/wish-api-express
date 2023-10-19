const  dotenv  = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();
const aksesJwt = process.env.ACCESS_TOKEN_SECRET


// Fungsi middleware untuk memverifikasi JWT
function verifyToken(req, res, next) {
  // Ambil token dari header, query parameter, atau cookie sesuai preferensi Anda
  const token = req.headers.authorization;

  // Periksa apakah token ada
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
  }

  // Verifikasi token
  jwt.verify(token, aksesJwt , (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }

    // Token valid, simpan data user yang terverifikasi pada objek request
    req.user = decoded;

    // Lanjutkan ke rute berikutnya
    next();
  });
}
// Middleware untuk memeriksa peran pengguna
const checkRoleMiddleware = (role) => (req, res, next) => {
  const tokenRole = req.user.role; // Ambil peran dari token JWT

  if (tokenRole !== role) {
    return res.status(403).json({ message: 'Akses ditolak' });
  }

  // Lanjutkan jika peran cocok
  next();
};

module.exports = {verifyToken , checkRoleMiddleware};
