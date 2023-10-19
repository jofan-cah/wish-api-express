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
        "suhu": [
            {
                "suhu_tubuh": 35.5,
                "satuan": "Celcius",
                "status": "Normal"
            }
        ],
        "oksi" : [
            {
                "values": [
                    {
                        "title": "Detak Jantung",
                        "value": 97,
                    },
                                                                {
                        "title": "Detak Jantung",
                        "value": 97,
                    },

                ],
                "status": "Normal"

}
        ]
        ,
        "berat" : 
        [
            {
                "berat_badan": 70,
                "satuan": "Kg",
                "status": "Normal"
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
