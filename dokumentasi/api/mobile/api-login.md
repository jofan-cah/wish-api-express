# Login Users


## Route

Untuk melakukan registrasi pengguna, Anda dapat menggunakan rute berikut:

- **HTTP POST /register**:
  Ini adalah rute yang digunakan untuk mendaftarkan pengguna baru. Pengguna akan diminta untuk memasukkan informasi seperti alamat email dan kata sandi. Setelah registrasi berhasil, pengguna akan dapat melakukan login menggunakan kredensial yang baru saja dibuat.
- Contoh URL:  `http://localhost:8003/login`

## Body


- `email` -  email harus unique dan sesuai dengan format email
- `password` - password berisi minimal 6 karakter huruf besar,kecil,angka dan karakter


## Permintaan

### Contoh Permintaan

```http
POST /login
```




## Berhasil Login

Jika Anda berhasil melakukan login dengan kredensial yang benar, Anda akan menerima respons JSON yang berisi token JWT:

```json
{
  "Message": "Berhasil Login",
  "data": {
        "id": "65227e4ddda9e32934535b51",
        "email": "jfn@gmail.com",
        "password": "******",
        "phone": "085702376814",
        "gender": "Laki-Laki",
        "nama": "Jofan",
        "birthday": "1999-12-14T00:00:00.000Z",
        "createdAt": "2023-10-08T10:02:53.475Z",
        "updatedAt": "2023-10-08T10:02:53.475Z"
    },
  "token": "kjdnkajhkjashfukfhashfjhfjshfjlsskajfkj"
}

```

## Jika Login Gagal
```json

{
    "error": "Email atau kata sandi salah.",
    "status" : 401
    
}

```