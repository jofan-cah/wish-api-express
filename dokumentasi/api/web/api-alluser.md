# Data Semua Pengguna

## Endpoint: `/users`

### Deskripsi
Endpoint `/users` digunakan untuk mengambil data semua pengguna.

### Metode
- **HTTP GET**

### Berhasil Mendapatkan Data Pengguna

Jika Anda berhasil mendapatkan data pengguna, Anda akan menerima tanggapan yang berisi daftar pengguna dengan informasi berikut:

```json
{
  "users": [
    {
      "email": "user1@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "detail": "Detail pengguna 1"
    },
    {
      "email": "user2@example.com",
      "name": "Jane Smith",
      "phone": "+9876543210",
      "detail": "Detail pengguna 2"
    },
    {
      "email": "user3@example.com",
      "name": "Alice Johnson",
      "phone": "+1122334455",
      "detail": "Detail pengguna 3"
    },
    {
      "email": "user4@example.com",
      "name": "Bob Williams",
      "phone": "+6677889900",
      "detail": "Detail pengguna 4"
    }
  ]
}

```


### Tidak Mendapatkan data

```json
{
{
    "status": 500,
    "error": "Internal Server Error",
    "message": "Gagal mengambil data pengguna. Silakan coba lagi nanti."
}

}
```