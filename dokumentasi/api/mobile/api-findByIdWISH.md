# Dokumentasi API GET Suhu Tubuh

Ini adalah dokumentasi API GET yang digunakan untuk mendapatkan data berdasarkan ID.

## Berhasil Menemukan

### Deskripsi

Jika permintaan berhasil dan ID yang diminta ditemukan, Anda akan menerima respons JSON yang berisi data tersebut.

### Endpoint
- Contoh URL: `http://localhost:8003/wish/:id`

- GET /wish/:id

### Respons JSON

```json
{
    "message": "Berhasil Menemukan ID",
    "data": {
        "id": "5",
        "user_id": "1",
        "body_temperature": [
        {
            "error": false,
            "status": "",
            "value": 0
        }
        ],
        "blood_oxygen" : [
        {    
            "error": false,
            "status": "",
            "value": 0
        }
        ]
        ,
        "heart_rate": [
        {
            "error": false,
            "status": "",
            "value": 0
        }
        ]
        ,
        "body_weight" : [
        {
            "error": false,
            "status": "",
            "value": 0
        }
        ]
    }
}
```

### Respons JSON Gagal 
```json
{
    "message": "ID tidak ditemukan",
    "status": 404
}
```
