# User by ID

Endpoint ini digunakan untuk mendapatkan informasi pengguna berdasarkan ID.

## Endpoint

- Contoh URL: `http://localhost:8003/users/:id`


## Parameter

- `id` (Path Parameter) - ID unik pengguna yang ingin ditemukan.

## Permintaan

### Contoh Permintaan

```http
GET /users/123
```

## Berhasil Menemukan

Jika Anda berhasil melakukan login dengan kredensial yang benar, Anda akan menerima respons JSON yang berisi token JWT:

```json

{
    "mesagge": "Berhasil Menemukan id",
    "data": {
        "email": "jfn@gmail.com",
        "password": "$2b$10$YQy079mEzMgo.i2fVfxjs.UxufyZauS1yhOV1hOOOzKXvP8iPNiUa",
        "phone": "085702376814",
        "gender": "Laki-Laki",
        "name": "Jofan",
        "birthday": "1999-12-14T00:00:00.000Z",
        "createdAt": "2023-10-08T12:00:52.350Z",
        "updatedAt": "2023-10-08T12:00:52.350Z",
        "id": "id"
    }
}

```

## Jika Tidak Menemukan id
```json

{
    "message": "Cast to ObjectId failed for value \"652299f4745438728083286\" (type string) at path \"_id\" for model \"users\"",
    "status" : 404
    
}

```
