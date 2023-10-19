# Data Semua Pengguna Admin

## Endpoint: `/admin`

### Deskripsi
Endpoint `/admin` digunakan untuk mengambil data semua pengguna.

### Metode
- **HTTP GET**

### Berhasil Mendapatkan Data Pengguna

Jika Anda berhasil mendapatkan data Admin, Anda akan menerima tanggapan yang berisi daftar Admin dengan informasi berikut:

```json
{
  "admin": [
    {
      "email": "admin1@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "status": "admin",
      "detail": "Detail pengguna 1"
    },
    {
      "email": "admin2@example.com",
      "name": "Jane Smith",
      "phone": "+9876543210",
      "status": "admin",
      "detail": "Detail pengguna 2"
    },
    {
      "email": "admin3@example.com",
      "name": "Alice Johnson",
      "phone": "+1122334455",
      "status": "admin",
      "detail": "Detail pengguna 3"
    },
    {
      "email": "admin4@example.com",
      "name": "Bob Williams",
      "phone": "+6677889900",
      "status": "admin",
      "detail": "Detail pengguna 4"
    }
  ]
}
```


## Tidak Mendapatkan data


### Tidak Mendapatkan data
