# Registrasi Pengguna

## Route

Untuk melakukan registrasi pengguna, Anda dapat menggunakan rute berikut:

- **HTTP POST /register**:
  Ini adalah rute yang digunakan untuk mendaftarkan pengguna baru. Pengguna akan diminta untuk memasukkan informasi seperti alamat email dan kata sandi. Setelah registrasi berhasil, pengguna akan dapat melakukan login menggunakan kredensial yang baru saja dibuat.
  - Contoh URL: `http://localhost:8003/admin/register`

## Berhasil Registrasi

Jika Anda berhasil melakukan registrasi dengan kredensial yang benar anda akan mendapat kan info seperti berikut:

```json
{
  "Message": "Berhasil Registrasi",
  "data": {
        "id": "65227e4ddda9e32934535b51",
        "email": "jfn@gmail.com",
        "password": "******",
        "nama": "Jofan",
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
            "path": "nomor_hp",
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
            "msg": "Kata sandi harus diisi",
            "path": "password",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Kata sandi harus memiliki panjang minimal 6 karakter",
            "path": "password",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Kata sandi harus mengandung setidaknya satu huruf kapital, satu huruf kecil, satu angka, dan satu karakter khusus",
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
            "path": "tanggal_lahir",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Format tanggal lahir tidak valid",
            "path": "tanggal_lahir",
            "location": "body"
        }
    ]
    
}
```