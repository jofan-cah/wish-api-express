# Pembaruan Data Pengguna

## Rute

Untuk melakukan pembaruan data pengguna, Anda dapat menggunakan rute berikut:

- **HTTP PUT /users**:
  Ini adalah rute yang digunakan untuk memperbarui data pengguna yang sudah terdaftar. Pengguna dapat memperbarui informasi seperti kata sandi, nomor telepon, jenis kelamin, dan lainnya.
  - Contoh URL: `http://localhost:8003/users`

## Body

- `id` - ID pengguna yang akan diperbarui.
- `email` - Alamat email harus unik dan sesuai dengan format email.
- `password` - Kata sandi harus berisi minimal 6 karakter dan mengandung huruf besar, huruf kecil, angka, dan karakter khusus.
- `gender` - Jenis kelamin harus diisi (Laki-Laki / Perempuan).
- `name` - Nama lengkap pengguna.
- `birthday` - Tanggal lahir pengguna.
- `phone` - Nomor telepon harus berbeda dengan yang sudah terdaftar.

## Permintaan

### Contoh Permintaan

```http
PUT /users
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