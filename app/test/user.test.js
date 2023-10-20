const request = require('supertest');
const app = require('../../server');

const db = require("../models/index")

const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const secret = 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225'
const userId = '6529057fa72f1aa7c3669b36'

// Unit test untuk GET /users/:id
it('should retrieve a user by ID when GET /users/:id', async () => {
  // Buat token JWT dengan role "user"
  const userToken = jwt.sign({ role: 'user' }, secret); // Gantilah secret dengan kunci rahasia yang sesuai

  // ID pengguna yang ingin Anda ambil
  const userId = '6529057fa72f1aa7c3669b36'

  // Lakukan permintaan GET /users/:id dengan token "user"
  const response = await request(app)
    .get(`/users/${userId}`)
    .set('Authorization', ` ${userToken}`); // Mengatur token JWT di header Authorization

  // Cetak respons (opsional)
  console.log('Response:', response.body);

  // Harap pastikan bahwa respons memiliki status kode 200 dan data adalah objek pengguna
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('data');
  expect(response.body.data).toHaveProperty('id', userId);
});

// Unit test untuk PUT /users/:id
it('should update a user by ID when PUT /users/:id', async () => {
  // Buat token JWT dengan role "user"
  const userToken = jwt.sign({ role: 'user' }, secret); // Gantilah secret dengan kunci rahasia yang sesuai

  // ID pengguna yang ingin Anda perbarui
  const userId = '6529057fa72f1aa7c3669b36'; // Gantilah dengan ID pengguna yang sebenarnya

  // Data pembaruan pengguna
  const updatedUserData = {
    email: 'jfn@example.com',
    name:"jofan",
    phone: '085702376812',
    password: "Jofan_14",
    gender: "Laki-Laki",
    birthday:"1999-12-14",



  };

  // Lakukan permintaan PUT /users/:id dengan token "user" dan data pembaruan
  const response = await request(app)
    .put(`/users/${userId}`)
    .set('Authorization', `${userToken}`) // Mengatur token JWT di header Authorization
    .send(updatedUserData);

  // Cetak respons (opsional)
  console.log('Response:', response.body);

  // Harap pastikan bahwa respons memiliki status kode 200 dan data pengguna yang diperbarui sesuai
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('message', 'Data pengguna berhasil diperbarui');
  expect(response.body).toHaveProperty('status', 200);
});

// // Unit test untuk DELETE /users/:id
// it('should delete a user by ID when DELETE /users/:id', async () => {
//   // Buat token JWT dengan role "user"
//   const userToken = jwt.sign({ role: 'user' }, secret); // Gantilah secret dengan kunci rahasia yang sesuai

//   // ID pengguna yang ingin Anda hapus
//   ; // Gantilah dengan ID pengguna yang sebenarnya

//   // Lakukan permintaan DELETE /users/:id dengan token "user"
//   const response = await request(app)
//     .delete(`/users/${userId}`)
//     .set('Authorization', ` ${userToken}`); // Mengatur token JWT di header Authorization

//   // Cetak respons (opsional)
//   console.log('Response:', response.body);

//   // Harap pastikan bahwa respons memiliki status kode 200 dan pesan pengguna berhasil dihapus
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toHaveProperty({
//     message: "Berhasil Menghapus",

// });
// });


// GetData
it('should retrieve a list of users when GET /users with admin role', async () => {
  // Buat token JWT dengan role "admin"
  const adminToken = jwt.sign({ role: 'admin' }, 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225'); // Gantilah secret dengan kunci rahasia yang sesuai

  // Lakukan permintaan GET /users dengan token "admin"
  const response = await request(app)
    .get('/users')
    .set('Authorization', `${adminToken}`); // Mengatur token JWT di header Authorization

  // Cetak respons (opsional)
  console.log('Response:', response.body);
  console.log('berhail menangkap Data');

  // Harap pastikan bahwa respons memiliki status kode 200 dan data adalah array
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body.data)).toBe(true);
});

  