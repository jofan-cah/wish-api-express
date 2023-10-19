# Data Kesehatan

Dalam dunia perawatan kesehatan, data kesehatan sangat penting untuk memantau kondisi pasien dan mengambil keputusan medis yang tepat. Di bawah ini, kami menyediakan contoh format data JSON untuk beberapa alat kesehatan yang umum digunakan.

## Oksimeter

Data dari alat oksimeter dapat memberikan informasi tentang tingkat oksigen dalam darah seseorang. Berikut adalah contoh data JSON yang mungkin dihasilkan oleh alat oksimeter:


```json
{
  "oksigendarah": 97,
  "denyut_jantung": 75,
  "status" : "Normal"
}
```

## Data Oksimeter

- `Kadar oksigen tinggi` : 
    Tekanan parsial oksigen (PaO2): di atas 120 mmHg

-   `Kadar oksigen normal`
    Saturasi oksigen (SaO2): 95–100%
    Tekanan parsial oksigen (PaO2): 80–100 mmHg

-   `Kadar oksigen rendah`
    Saturasi oksigen (SaO2): di bawah 95%
    Tekanan parsial oksigen (PaO2): di bawah 80 mmHg
- Sumber URL: `https://www.alodokter.com/penting-diketahui-ini-kadar-oksigen-normal-dalam-darah`


## Termometer
```json
{
  "suhu_tubuh": 35.5,
  "satuan" : "Celcius",
  "status": "Normal"
}
```

## Data Termometer
- `Suhu Tubuh Tinggi` > 39'C
- `Suhu Tubuh Normal` <= 35 && >= 39'C
- `Suhu Tubuh redndah` < 35'C

- Sumber URL: `https://www.alodokter.com/memahami-suhu-tubuh`



## Berat Badan
```json
{
  "berat_badan": 70,
  "satuan" : "Kg",
  "status": "Normal"
}
```

## Data
- `Pria`: Berat badan ideal (kg) = [tinggi badan (cm) - 100] - [(tinggi badan (cm) - 100) x 10%]
- `Wanita`: Berat badan ideal (kg) = [tinggi badan (cm) - 100] - [(tinggi badan (cm) - 100) x 15%]

- `Url` : https://health.detik.com/kebugaran/d-6500876/cara-menghitung-berat-badan-ideal-mudah-untuk-pria-dan-wanita.

## Contoh Perhitungan

- `Untuk Pria `(Tinggi Badan: 180 cm)

    -    Berat badan ideal =
    -    (tinggi badan - 100) - [(tinggi badan - 100) x 10%]
    -    Berat badan ideal = (180 - 100) - [(180 - 100) x 10%]
    -    Berat badan ideal = 80 - (80 x 0.10)
    -    Berat badan ideal = 80 - 8
    -    Berat badan ideal = 72 kg

- `Untuk Wanita `(Tinggi Badan: 160 cm)

    - Berat badan ideal = (tinggi badan - 100) - [(tinggi badan - 100) x 15%]
    - Berat badan ideal = (160 - 100) - [(160 - 100) x 15%]
    - Berat badan ideal = 60 - (60 x 0.15)
    - Berat badan ideal = 60 - 9
    - Berat badan ideal = 51 kg

