const request = require('supertest');
const bcrypt = require('bcrypt')
const { app , server} = require('../../server'); // Sesuaikan path dengan server Anda
const { body } = require('express-validator');

const jwt = require('jsonwebtoken');
const  dotenv  = require("dotenv");
dotenv.config();

const aksesJwt = process.env.ACCESS_TOKEN_SECRET


describe('WISH' ,() => {

  describe('Admin Controller', () => {
    // Test untuk Admin controller
    // describe('POST /admins', () => {
    //   it('should create a new admin', async () => {
    //     const response = await request(app)
    //       .post('/admins')
    //       .send({ 
    //           "email" : "admin311@gmail.com",
    //           "password" : "Admin_123",
    //           "name" : "Admin Jofan"
    //        });

    //     // Cetak respons (opsional)
    //   console.log('Response:', response.body);


    //     expect(response.statusCode).toBe(201);
    //     expect(response.body.message).toBe('Data Berhasil Ditambahkan');
    //   });

    //   it('should return an error on invalid input', async () => {
    //     const response = await request(app)
    //       .post('/admins')
    //       .send({ /* invalid input data */ });

    //     expect(response.statusCode).toBe(500);
    //     // Tambahkan assertions lainnya sesuai kebutuhan
    //   });
    // });

    // Tambahkan test lainnya untuk fungsi-fungsi lain di Admin controller
    describe('GET /admins', () => {
      it('should retrieve all admin data with valid JWT and role admin', async () => {
        // Buat token JWT yang valid dengan role 'admin'
        const payload = { role: 'admin' , id : '65323aff65449db40bfa1830'};
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const response = await request(app)
          .get('/admins')
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Berhasil Mengambil Semua Data');
        expect(Array.isArray(response.body.data)).toBe(true); // Memastikan data adalah array
        // Tambahan assertions sesuai kebutuhan, seperti memeriksa format data
      });

      it('should return 401 with valid JWT and role user', async () => {
        // Buat token JWT yang valid dengan role 'user'
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const response = await request(app)
          .get('/admins')
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(403); // Harus mengembalikan Unauthorized (403)
        // Tambahan assertions sesuai kebutuhan
      });

      it('should return 401 without JWT', async () => {
        const response = await request(app).get('/admins');

        expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
        // Tambahan assertions sesuai kebutuhan
      });
    });


    
    describe('GET /admins/:id', () => {
      it('should retrieve admin data with valid JWT and matching ID', async () => {
        // Buat token JWT yang valid dengan role 'admin'
        const payload = { role: 'admin' ,id : '65323aff65449db40bfa1830' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        // Gantilah `validAdminId` dengan ID admin yang valid di database Anda
        const validAdminId = '65323aff65449db40bfa1830';

        const response = await request(app)
          .get(`/admins/${validAdminId}`)
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT
  console.log(response.body.data)
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Berhasil Menemukan');
        expect(Array.isArray(response.body.data)).toBe(false); 
        // Anda dapat menambahkan assertions tambahan sesuai dengan format data yang Anda harapkan
      });

      it('should return 401 with valid JWT and non-matching ID', async () => {
        // Buat token JWT yang valid dengan role 'admin'
        const payload = { role: 'admin' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        // Gantilah `nonMatchingAdminId` dengan ID yang tidak cocok dengan admin yang valid di database Anda
        const nonMatchingAdminId = '65323aff65449db40bfa1830l';

        const response = await request(app)
          .get(`/admins/${nonMatchingAdminId}`)
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
        // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
      });

      it('should return 401 with valid JWT and role user', async () => {
        // Buat token JWT yang valid dengan role 'user'
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        // Gantilah `validAdminId` dengan ID admin yang valid di database Anda
        const validAdminId = '65323aff65449db40bfa1830';

        const response = await request(app)
          .get(`/admins/${validAdminId}`)
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(403); // Harus mengembalikan Unauthorized (401)
        // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
      });

      it('should return 401 without JWT', async () => {
        // Gantilah `validAdminId` dengan ID admin yang valid di database Anda
        const validAdminId = '65323aff65449db40bfa1830';

        const response = await request(app)
          .get(`/admins/${validAdminId}`);

        expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
        // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
      });
    });

    describe('PUT /admins/:id', () => {
      let token;

    beforeAll(async () => {
      // Buat token JWT yang valid dengan role 'admin' (gantilah dengan payload yang sesuai)
      const payload = { role: 'admin', id: '65323aff65449db40bfa1830' };
      token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    });

    it('should update admin data with valid JWT and matching ID', async () => {
      const newAdminData = {
        email: 'admin321@gmail.com',
        name: 'New Admin',
        password: 'Jofan_26!'
      };

      const validAdminId = '65323aff65449db40bfa1830';


      const response = await request(app)
        .put('/admins/65323aff65449db40bfa1830')
        .set('Authorization', `${token}`)
        .send(newAdminData);

      expect(response.statusCode).toBe(200);
      // expect(response.body.message).toBe('Data pengguna berhasil diperbarui');
    });

    it('should return 401 with valid JWT and non-matching ID', async () => {
      const nonMatchingAdminId = '65323aff65449db40bfa1830a';
      const newAdminData = {
        email: 'newadmin@example.com',
        name: 'New Admin',
        password: 'NewPassword123!',
      };

      const response = await request(app)
        .put(`/admins/${nonMatchingAdminId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAdminData);

      expect(response.statusCode).toBe(401);
    });

    it('should return 401 with valid JWT and role user', async () => {
      const payload = { role: 'user' };
      const userToken = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

      const newAdminData = {
        email: 'newadmin@example.com',
        name: 'New Admin',
        password: 'NewPassword123!',
      };

      const response = await request(app)
        .put(`/admins/65323aff65449db40bfa1830`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(newAdminData);

      expect(response.statusCode).toBe(401);
    });

    it('should return 400 with valid JWT and invalid data', async () => {
      const newAdminData = {
        email: 'invalidemail',
        name: 'New Admin',
        password: 'short',
      };

      const response = await request(app)
        .put(`/admins/65323aff65449db40bfa1830`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAdminData);

      expect(response.statusCode).toBe(401);
    });
    });

  //   describe('DELETE /admins/:id', () => {
  //     it('should delete admin data with valid JWT and matching ID', async () => {
  //       // Buat token JWT yang valid dengan role 'admin'
  //       const payload = { role: 'admin',id :"65323aff65449db40bfa1830" };
  //       const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

  //       // Gantilah `validAdminId` dengan ID admin yang valid di database Anda
  //       const validAdminId = '65323aff65449db40bfa1830';

  //       const response = await request(app)
  //         .delete(`/admins/${validAdminId}`)
  //         .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body.message).toBe('Berhasil Menghapus');
  //       // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
  //     });

  //     // it('should return 401 with valid JWT and non-matching ID', async () => {
  //     //   // Buat token JWT yang valid dengan role 'admin'
  //     //   const payload = { role: 'admin' };
  //     //   const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

  //     //   // Gantilah `nonMatchingAdminId` dengan ID yang tidak cocok dengan admin yang valid di database Anda
  //     //   const nonMatchingAdminId = '65323aff65449db40bfa1830n';

  //     //   const response = await request(app)
  //     //     .delete(`/admins/${nonMatchingAdminId}`)
  //     //     .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

  //     //   expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
  //     //   // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
  //     // });

  //     // it('should return 401 with valid JWT and role user', async () => {
  //     //   // Buat token JWT yang valid dengan role 'user'
  //     //   const payload = { role: 'user' };
  //     //   const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

  //     //   // Gantilah `validAdminId` dengan ID admin yang valid di database Anda
  //     //   const validAdminId = '65323aff65449db40bfa1830';

  //     //   const response = await request(app)
  //     //     .delete(`/admins/${validAdminId}`)
  //     //     .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

  //     //   expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
  //     //   // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
  //     // });
  //   });

  describe('User GET USERS', () => {
    it('should retrieve all user data with valid JWT and role user', async () => {
    // Buat token JWT yang valid dengan role 'user'
    const payload = { role: 'admin', id: '65323aff65449db40bfa1830' };
    const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

    const response = await request(app)
        .get('/users')
        .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Berhasil Mengambil Semua Data');
    expect(Array.isArray(response.body.data)).toBe(true); // Memastikan data adalah array
    // Tambahan assertions sesuai kebutuhan, seperti memeriksa format data
    
    console.log('All admin data:', response.body.data);
    });

    it('should return 401 with valid JWT and role admin', async () => {
    // Buat token JWT yang valid dengan role 'admin'
    const payload = { role: 'user' };
    const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

    const response = await request(app)
        .get('/users')
        .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        console.log('All admin data:', response.body.data);
    expect(response.statusCode).toBe(403); // Harus mengembalikan Forbidden (403) karena role admin tidak diizinkan
    // Tambahan assertions sesuai kebutuhan
    });

    it('should return 401 without JWT', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401) tanpa JWT
    // Tambahan assertions sesuai kebutuhan
    });
  });


  // afterAll(async() => {
  //   await server.close(); // Tutup server Express
  //   await app.closeDatabaseConnection(); // Tutup koneksi database// Tutup koneksi database jika Anda membutuhkannya
  // });
    
  });

  describe('User Routes', () => {

    describe('User GET /users/:id', () => {
      it('should retrieve user data with valid JWT and matching ID', async () => {
        // Buat token JWT yang valid dengan role 'user'
        const payload = { role: 'user' , id:'6529057fa72f1aa7c3669b36' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });


        const response = await request(app)
          .get('/users/6529057fa72f1aa7c3669b36')
          .set('Authorization', token); // Mengatur header Authorization dengan token JWT
          console.log('All admin data:', response.body.message);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(`Berhasil Menemukan `);
        expect(Array.isArray(response.body.data)).toBe(false); 
        // Anda dapat menambahkan assertions tambahan sesuai dengan format data yang Anda harapkan
      });

      it('should return 401 with valid JWT and non-matching ID', async () => {
        // Buat token JWT yang valid dengan role 'user'
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        // Gantilah `nonMatchingUserId` dengan ID yang tidak cocok dengan pengguna yang valid di database Anda
        const nonMatchingUserId = '6529057fa72f1aa7c3669b36lll';

        const response = await request(app)
          .get(`/users/${nonMatchingUserId}`)
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(404); // Harus mengembalikan Unauthorized (401)
        // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
      });


      it('should return 401 without JWT', async () => {
        // Gantilah `validUserId` dengan ID pengguna yang valid di database Anda
        const validUserId = '6529057fa72f1aa7c3669b36';

        const response = await request(app)
          .get(`/users/${validUserId}`);

        expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401) tanpa JWT
        // Anda dapat menambahkan assertions tambahan sesuai dengan kebutuhan
      });
    });

    

    describe('User PUT /users/:id', () => {
    let token;
    let userID;

    beforeAll(async () => {
      // Buat token JWT yang valid dengan role 'user' dan dapatkan ID pengguna
      const payload = { role: 'user', id: '6529057fa72f1aa7c3669b36' }; // Gantilah ID pengguna yang sesuai
      token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

      // Simpan ID pengguna yang valid dalam variable userID
      userID = payload.id;
    });
      it('should update user data with valid JWT and matching ID', async () => {
        // Buat objek data pengguna yang akan diupdate
        const updatedUserData = {
          email: 'jfn@example.com',
          password: 'Jofan_26',
          gender: 'Laki-Laki',
          name: 'jofan',
          birthday: '1999-12-14',

          phone: '085702376812',

        };

        // Lakukan permintaan PUT ke endpoint /users/:id dengan data pengguna yang valid
        const response = await request(app)
          .put(`/users/${userID}`)
          .set('Authorization', `${token}`)
          .send(updatedUserData);

        // Periksa respons server
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Data pengguna berhasil diperbarui');

        // Anda juga dapat menambahkan pengujian lebih lanjut untuk memeriksa data pengguna yang diperbarui di database
      });

      // it('should return 400 with valid JWT and validation errors', async () => {
      //   // Buat objek data pengguna yang tidak valid untuk menghasilkan kesalahan validasi
      //   const invalidUserData = {
      //     email: 'invalidemail', // Email tidak valid
      //     phone: '1234567890', // Nomor HP sama dengan data yang sudah ada
      //     password: 'short', // Kata sandi terlalu pendek
      //     gender: '', // Jenis kelamin tidak diisi
      //     name: '', // Nama tidak diisi
      //     birthday: 'invaliddate', // Tanggal lahir tidak valid
      //   };

      //   // Lakukan permintaan PUT ke endpoint /users/:id dengan data pengguna tidak valid
      //   const response = await request(app)
      //     .put(`/users/${userID}`)
      //     .set('Authorization', `Bearer ${token}`)
      //     .send(invalidUserData);

      //   // Periksa respons server
      //   expect(response.statusCode).toBe(400);

      //   // Anda juga dapat menambahkan pengujian lebih lanjut untuk memeriksa pesan kesalahan validasi yang sesuai
      // });

      // it('should return 404 with valid JWT and non-matching ID', async () => {
      //   // Buat ID pengguna yang tidak cocok dengan token
      //   const nonMatchingUserID = 'nonmatchingid';

      //   // Lakukan permintaan PUT ke endpoint /users/:id dengan ID yang tidak cocok
      //   const response = await request(app)
      //     .put(`/users/${nonMatchingUserID}`)
      //     .set('Authorization', `Bearer ${token}`)
      //     .send({
      //       // Kirim data pengguna yang valid
      //       email: 'newemail@example.com',
      //       phone: '1234567890',
      //       password: 'newpassword',
      //       gender: 'Male',
      //       name: 'John Doe',
      //       birthday: '1990-01-01',
      //     });

      //   // Periksa respons server
      //   expect(response.statusCode).toBe(404);
      // });

      // it('should return 401 without JWT', async () => {
      //   // Lakukan permintaan PUT ke endpoint /users/:id tanpa JWT
      //   const response = await request(app)
      //     .put(`/users/${userID}`)
      //     .send({
      //       // Kirim data pengguna yang valid
      //       email: 'newemail@example.com',
      //       phone: '1234567890',
      //       password: 'newpassword',
      //       gender: 'Male',
      //       name: 'John Doe',
      //       birthday: '1990-01-01',
      //     });

      //   // Periksa respons server
      //   expect(response.statusCode).toBe(401);
      // });
    });


  });

  describe('Login Route User', () => {
    it('should log in with valid email and password', async () => {
      // Buat objek data pengguna yang valid
      const validUserData = {
        "email" : "jafn@gmail.com",
        "password" : "Jofan_26"
      };

      // Lakukan permintaan POST ke endpoint /login dengan data pengguna yang valid
      const response = await request(app)
        .post('/auth/login')
        .send(validUserData);

      // Periksa respons server
      expect(response.statusCode).toBe(200);
      expect(response.body.Message).toBe('Berhasil Login');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('role');

      // Anda dapat menambahkan pengujian lebih lanjut untuk memeriksa token JWT yang dihasilkan
    });

    it('should return 401 with invalid email', async () => {
      // Buat objek data pengguna dengan email yang tidak valid
      const invalidEmailData = {
        email: 'invalidemail',
        password: 'password123',
      };

      // Lakukan permintaan POST ke endpoint /login dengan email tidak valid
      const response = await request(app)
        .post('/auth/login')
        .send(invalidEmailData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);
    });

    it('should return 401 with invalid password', async () => {
      // Buat objek data pengguna dengan kata sandi yang tidak valid
      const invalidPasswordData = {
        email: 'user@example.com',
        password: 'invalidpassword',
      };

      // Lakukan permintaan POST ke endpoint /login dengan kata sandi tidak valid
      const response = await request(app)
        .post('/auth/login')
        .send(invalidPasswordData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);
    });

    it('should return 400 with missing email or password', async () => {
      // Buat objek data pengguna dengan email atau kata sandi yang kosong
      const missingData = {
        email: '',
        password: '',
      };

      // Lakukan permintaan POST ke endpoint /login dengan email atau kata sandi kosong
      const response = await request(app)
        .post('/auth/login')
        .send(missingData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);

      // Anda juga dapat memeriksa pesan kesalahan validasi yang sesuai
    });

  });

  // describe('Register Route User', () => {
  //   it('should register a new user with valid data', async () => {
  //     // Buat objek data pengguna yang valid
  //     const validUserData = {
  //       email: 'newuser12@example.com',
  //       password: 'Password123',
  //       phone: '1234567899',
  //       name: 'New User',
  //       birthday: '1990-01-01',
  //       gender: 'Laki Laki',
  //     };

  //     // Lakukan permintaan POST ke endpoint /register dengan data pengguna yang valid
  //     const response = await request(app)
  //       .post('/auth/register')
  //       .send(validUserData);

  //     // Periksa respons server
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.message).toBe('Data Berhasil Di Tambah');

  //     // Anda dapat menambahkan pengujian lebih lanjut untuk memeriksa data pengguna yang disimpan di database
  //   });

  //   it('should return 400 with missing or invalid data', async () => {
  //     // Buat objek data pengguna dengan data yang tidak valid atau kurang
  //     const invalidUserData = {
  //       email: 'invalidemail', // Email tidak valid
  //       password: 'short', // Kata sandi terlalu pendek
  //       // Data yang diperlukan seperti phone, name, birthday, dan gender dihilangkan
  //     };

  //     // Lakukan permintaan POST ke endpoint /register dengan data yang tidak valid
  //     const response = await request(app)
  //       .post('/auth/register')
  //       .send(invalidUserData);

  //     // Periksa respons server
  //     expect(response.statusCode).toBe(400);

  //     // Anda juga dapat memeriksa pesan kesalahan validasi yang sesuai
  //   });

    
  //   jest.resetModules();
  // });

  describe('Login Route Admins', () => {
    it('should log in with valid email and password', async () => {
      // Buat objek data pengguna yang valid
      const validUserData = {
        "email" : "admin311@gmail.com",
        "password" : "Admin_123"
      };

      // Lakukan permintaan POST ke endpoint /login dengan data pengguna yang valid
      const response = await request(app)
        .post('/auth/login-admin')
        .send(validUserData);

      // Periksa respons server
      expect(response.statusCode).toBe(200);
      expect(response.body.Message).toBe('Berhasil Login');
      expect(response.body).toHaveProperty('token');
      // expect(response.body).toHaveProperty('role');

    });

    it('should return 401 with invalid email', async () => {
      // Buat objek data pengguna dengan email yang tidak valid
      const invalidEmailData = {
        email: 'invalidemail',
        password: 'password123',
      };

      // Lakukan permintaan POST ke endpoint /login dengan email tidak valid
      const response = await request(app)
        .post('/auth/login')
        .send(invalidEmailData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);
    });

    it('should return 401 with invalid password', async () => {
      // Buat objek data pengguna dengan kata sandi yang tidak valid
      const invalidPasswordData = {
        email: 'user@example.com',
        password: 'invalidpassword',
      };

      // Lakukan permintaan POST ke endpoint /login dengan kata sandi tidak valid
      const response = await request(app)
        .post('/auth/login')
        .send(invalidPasswordData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);
    });

    it('should return 400 with missing email or password', async () => {
      // Buat objek data pengguna dengan email atau kata sandi yang kosong
      const missingData = {
        email: '',
        password: '',
      };

      // Lakukan permintaan POST ke endpoint /login dengan email atau kata sandi kosong
      const response = await request(app)
        .post('/auth/login')
        .send(missingData);

      // Periksa respons server
      expect(response.statusCode).toBe(401);

      // Anda juga dapat memeriksa pesan kesalahan validasi yang sesuai
    });

  });

  describe('Register Route Admins', () => {
    // it('should register a new user with valid data', async () => {
    //   // Buat objek data pengguna yang valid
    //   const validUserData = {
    //     email: 'newuser12@example.com',
    //     password: 'Password123',
    //     name: 'New User'

    //   };

    //   // Lakukan permintaan POST ke endpoint /register dengan data pengguna yang valid
    //   const response = await request(app)
    //     .post('/auth/regist-admin')
    //     .send(validUserData);

    //   // Periksa respons server
    //   expect(response.statusCode).toBe(201);
    //   expect(response.body.message).toBe('Data Berhasil Di Tambah');

    //   // Anda dapat menambahkan pengujian lebih lanjut untuk memeriksa data pengguna yang disimpan di database
    // });

    it('should return 400 with missing or invalid data', async () => {
      // Buat objek data pengguna dengan data yang tidak valid atau kurang
      const invalidUserData = {
        email: 'invalidemail', // Email tidak valid
        password: 'short', // Kata sandi terlalu pendek
        // Data yang diperlukan seperti phone, name, birthday, dan gender dihilangkan
      };

      // Lakukan permintaan POST ke endpoint /regist-admin dengan data yang tidak valid
      const response = await request(app)
        .post('/auth/regist-admin')
        .send(invalidUserData);

      // Periksa respons server
      expect(response.statusCode).toBe(400);

      // Anda juga dapat memeriksa pesan kesalahan validasi yang sesuai
    });

    
    // jest.resetModules();
  });


  describe('Sensors Controller',() => {

  
    describe('Post /sensor',() => {
    it('should Sensor with data valid ', async () => {
      // Buat objek data pengguna yang valid
      const sensors ={
        "uuid": "652f56891c749f2f4aecafa7",
        "duration": 60,
        "blood_oxygen": [
          {
            "duration": 50,
            "start_at": "2023-10-16T02:33:49.287Z",
            "end_at": "2023-10-16T03:34:19.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "85"
          }
        ],
        "blood_pressure": [
          {
            "duration": 70,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "90/82"
          }
        ],
        "blood_sugar": [
          {
            "duration": 70,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "90"
          }
        ],
        "body_mass_index": [
          {
            "duration": 60,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "60"
          }
        ],
        "body_temperature": [
          {
            "duration": 60,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "40"
          }
        ],
        "body_weight": [
          {
            "duration": 80,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "normal",
            "value": "50"
          }
        ],
        "cholesterol": [
          {
            "duration": 60,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "180"
          }
        ],
        "heart_rate": [
          {
            "duration": 70,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "80"
          }
        ],
        "hemoglobin": [
          {
            "duration": 60,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "70"
          }
        ],
        "uric_acid": [
          {
            "duration": 60,
            "start_at": "2023-10-16T01:33:49.287Z",
            "end_at": "2023-10-16T02:34:49.287Z",
            "error": false,
            "status": "melebihi normal",
            "value": "6"
          }
        ]
      };

      // Lakukan permintaan POST ke endpoint /login dengan data pengguna yang valid
      const payload = { role: 'admin' , id : '65323aff65449db40bfa1830'};
      const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

      const response = await request(app)
        .post('/sensor')
        .set('Authorization', `${token}`)
        .send(sensors); // Mengatur header Authorization dengan token JWT

      // Periksa respons server
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Berhasil Menyimpan Data');


    });


    })
    describe('GET ALL /Sensor', () => {
      it('should retrieve all sensor', async () => {
        // Buat token JWT yang valid dengan role 'admin'
        const payload = { role: 'admin' , id : '65323aff65449db40bfa1830'};
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const response = await request(app)
          .get('/sensor')
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Berhasil menampilkan semmua data');
        expect(Array.isArray(response.body.data)).toBe(true); // Memastikan data adalah array
        // Tambahan assertions sesuai kebutuhan, seperti memeriksa format data
      });

      it('should return 401 with valid JWT and role user', async () => {
        // Buat token JWT yang valid dengan role 'user'
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const response = await request(app)
          .get('/admins')
          .set('Authorization', `${token}`); // Mengatur header Authorization dengan token JWT

        expect(response.statusCode).toBe(403); // Harus mengembalikan Unauthorized (403)
        // Tambahan assertions sesuai kebutuhan
      });

      it('should return 401 without JWT', async () => {
        const response = await request(app).get('/admins');

        expect(response.statusCode).toBe(401); // Harus mengembalikan Unauthorized (401)
        // Tambahan assertions sesuai kebutuhan
      });


    });

    describe('GET /sensor/oxygen/:uuid', () => {
      it('should retrieve sensor data with valid JWT and matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a valid sensor UUID from your database
        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/oxygen/${validSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        // expect(response.body.message).toBe('Berhasil Menemukan');
        // expect(Array.isArray(response.body.data)).toBe(true);
        // You can add more assertions based on the expected data format
      });
    
      it('should return 401 with valid JWT and non-matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a non-matching sensor UUID from your database
        const nonMatchingSensorUUID = 'your-non-matching-sensor-uuid';
    
        const response = await request(app)
          .get(`/sensor/oxygen/${nonMatchingSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(404); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    
    
      it('should return 401 without JWT', async () => {
        // Replace with a valid sensor UUID from your database
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/oxygen/${validSensorUUID}`)
        ;
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /sensor/pressure/:uuid', () => {
      it('should retrieve sensor data with valid JWT and matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a valid sensor UUID from your database
        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/pressure/${validSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        // expect(response.body.message).toBe('Berhasil Menemukan');
        // expect(Array.isArray(response.body.data)).toBe(true);
        // You can add more assertions based on the expected data format
      });
    
      it('should return 401 with valid JWT and non-matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a non-matching sensor UUID from your database
        const nonMatchingSensorUUID = 'your-non-matching-sensor-uuid';
    
        const response = await request(app)
          .get(`/sensor/pressure/${nonMatchingSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(404); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    
    
      it('should return 401 without JWT', async () => {
        // Replace with a valid sensor UUID from your database
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/pressure/${validSensorUUID}`)
        ;
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /sensor/weight/:uuid', () => {
      it('should retrieve sensor data with valid JWT and matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a valid sensor UUID from your database
        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/weight/${validSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        // expect(response.body.message).toBe('Berhasil Menemukan');
        // expect(Array.isArray(response.body.data)).toBe(true);
        // You can add more assertions based on the expected data format
      });
    
      it('should return 401 with valid JWT and non-matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a non-matching sensor UUID from your database
        const nonMatchingSensorUUID = 'your-non-matching-sensor-uuid';
    
        const response = await request(app)
          .get(`/sensor/weight/${nonMatchingSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(404); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    
    
      it('should return 401 without JWT', async () => {
        // Replace with a valid sensor UUID from your database
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/weight/${validSensorUUID}`)
        ;
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /sensor/latestData/:uuid', () => {
      it('should retrieve sensor latestData data with valid JWT and matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a valid sensor UUID from your database
        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/latestData/${validSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        // expect(response.body.message).toBe('Berhasil Menemukan');
        // expect(Array.isArray(response.body.data)).toBe(true);
        // You can add more assertions based on the expected data format
      });
    
      it('should return 401 with valid JWT and non-matching UUID', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace with a non-matching sensor UUID from your database
        const nonMatchingSensorUUID = 'your-non-matching-sensor-uuid';
    
        const response = await request(app)
          .get(`/sensor/latestData/${nonMatchingSensorUUID}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(404); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    
      it('should return 401 without JWT', async () => {
        // Replace with a valid sensor UUID from your database
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });

        const validSensorUUID = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/latestData/${validSensorUUID}`)
        ;
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /sensor/avgSensor', () => {
      it('should return status 200 with valid JWT', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };

        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        const response = await request(app)
          .get('/sensor/avgSensor')
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
      });
    
      it('should return 401 without JWT', async () => {
        const response = await request(app)
          .get('/sensor/avgSensor');
    
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /avgSensorstatus', () => {
      it('should return status 200 with valid JWT', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        const response = await request(app)
          .get('/sensor/avgSensorstatus')
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
      });
    
      it('should return 401 without JWT', async () => {
        const response = await request(app)
          .get('/sensor/avgSensorstatus');
    
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });

    describe('GET /pengunjung', () => {
      it('should return status 200 with valid JWT and admin role', async () => {
        // Create a valid JWT token with a role (e.g., 'admin')
        const payload = { role: 'admin' };
    
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        const response = await request(app)
          .get('/sensor/pengunjung')
          .set('Authorization', ` ${token}`);
    
        expect(response.statusCode).toBe(200);
        // expect(response.body.message).toBe('Berhasil menampilkan semmua data');
        expect(Array.isArray(response.body.data)).toBe(false); // Memastikan data adalah array
        // Tambahan assertions sesuai kebutuhan, seperti memeriksa format data
        // You can add more assertions based on the expected data format
      });
    
      it('should return 403 with valid JWT and non-admin role', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };
    
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        const response = await request(app)
          .get('/sensor/pengunjung')
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(403); // Should return Forbidden (403)
        // You can add more assertions based on your expected behavior
      });
    
      it('should return 401 without JWT', async () => {
        const response = await request(app)
          .get('/sensor/pengunjung');
    
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });


    describe('GET /pengunjungStatus/:uuid', () => {
      it('should return status 200 with valid JWT and admin role', async () => {
        // Create a valid JWT token with a role (e.g., 'admin')
        const payload = { role: 'admin' };
    
        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace ':uuid' with a valid sensor UUID from your database
        const uuid = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/pengunjungStatus/${uuid}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(200);
        // You can add more assertions based on the expected data format
      });
    
      it('should return 403 with valid JWT and non-admin role', async () => {
        // Create a valid JWT token with a role (e.g., 'user')
        const payload = { role: 'user' };

        const token = jwt.sign(payload, aksesJwt, { expiresIn: '1h' });
    
        // Replace ':uuid' with a valid sensor UUID from your database
        const uuid = '652f56891c749f2f4aecafa7';
    
        const response = await request(app)
          .get(`/sensor/pengunjungStatus/${uuid}`)
          .set('Authorization', `${token}`);
    
        expect(response.statusCode).toBe(403); // Should return Forbidden (403)
        // You can add more assertions based on your expected behavior
      });
    
      it('should return 401 without JWT', async () => {
        // Replace ':uuid' with a valid sensor UUID from your database
        const validSensorUUID = 'your-valid-sensor-uuid';
    
        const response = await request(app)
          .get(`/sensor/pengunjungStatus/${validSensorUUID}`);
    
        expect(response.statusCode).toBe(401); // Should return Unauthorized (401)
        // You can add more assertions based on your expected behavior
      });
    });
    
})

  afterAll(async () => {
    await server.close(); // Tutup server Express
    await app.closeDatabaseConnection(); // Tutup koneksi database jika Anda membutuhkannya
  });

})