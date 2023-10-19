# Registrasi Pengguna

## Route

Untuk melakukan registrasi pengguna, Anda dapat menggunakan rute berikut:

- **HTTP POST /register**:
  Ini adalah rute yang digunakan untuk mendaftarkan pengguna baru. Pengguna akan diminta untuk memasukkan informasi seperti alamat email dan kata sandi. Setelah registrasi berhasil, pengguna akan dapat melakukan login menggunakan kredensial yang baru saja dibuat.
  - Contoh URL: `http://localhost:8003/register`


## Body


- `email` -  email harus unique dan sesuai dengan format email
- `password` - password berisi minimal 6 karakter huruf besar,kecil,angka dan karakter
- `gender` - Laki Laki / Perempuan
- `name` - Masukan name lengkap
- `birthday` - tanggal Lahir
- `phone` - Harus beda dengan yang sudah terdaftar

## Permintaan

### Contoh Permintaan

```http
POST /register
```


## Berhasil Registrasi

Jika Anda berhasil melakukan registrasi dengan kredensial yang benar anda akan mendapat kan info seperti berikut:

```json
{
  "Message": "Berhasil Registrasi",
  "data": {
        "id": "65227e4ddda9e32934535b51",
        "email": "jfn@gmail.com",
        "password": "******",
        "gender": "Laki-Laki",
        "name": "Jofan",
        "birthday": "1999-12-14T00:00:00.000Z",
        "createdAt": "2023-10-08T10:02:53.475Z",
        "updatedAt": "2023-10-08T10:02:53.475Z"
    },


}
```

## Jika Gagal Register

```json
{
    "status": 400,
    "errors": [
        {
            "type": "field",
            "value": "contoh@gmail.com",
            "msg": "Email sudah digunakan",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Email harus di isi",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "Nomor hp sudah digunakan",
            "path": "phone",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Kata sandi harus diisi",
            "path": "password",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Jenis kelamin harus diisi",
            "path": "gender",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Nama harus diisi",
            "path": "nama",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Tanggal lahir harus diisi",
            "path": "birthday",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Format tanggal lahir tidak valid",
            "path": "birthday",
            "location": "body"
        }
    ]
    
}
```