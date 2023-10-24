const { json } = require("express");
const db = require("../models");
const Sensor = db.sensors;

exports.create = (req, res) => {
    // res.json({message: req.body})
    Sensor.create(req.body)
        .then(() => res.status(201).send({ message: "Berhasil Menyimpan Data" }))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req,res) => {
    Sensor.find()
    .then(data=> res.status(200).send({message:"Berhasil menampilkan semmua data", data :data}))
}

exports.delete = (req,res) => {
    const id = req.params.id
    Sensor.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({message: "Data Tidak di temukan"})
        }
        res.status(200).json({
            message: "berhasil Menghapus"
        })

    }).catch(err => 
        res.status(500).send({message:"Berhasil Menghapus"})
    );
}

// Mobile
exports.bloodOxygen = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    
    // Validasi query parameter
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Parameter halaman atau batas tidak valid' });
    }

    const sensorData = await Sensor.find({ uuid });

    if (sensorData.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    

    

    if (!sensorData) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const bloodOxygenData = sensorData.flatMap((item) => item.blood_oxygen);
    const heartRateData = sensorData.flatMap((item) => item.heart_rate);

    const combinedData = {
      blood_oxygen: bloodOxygenData,
      heart_rate: heartRateData,
    };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = {
      blood_oxygen: bloodOxygenData.slice(startIndex, endIndex),
      heart_rate: heartRateData.slice(startIndex, endIndex),
    };

    const totalItems = bloodOxygenData.length; // Total item bisa juga diambil dari heartRateData jika jumlahnya sama

    const totalPages = Math.ceil(totalItems / limit);

    const data = {
      combined_data: paginatedData,
      totalItems,
      totalPages,
    };

    if (page < totalPages) {
      data.nextPage = `/sensor/oxygen/${uuid}?page=${page + 1}&limit=${limit}`;
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data blood_oxygen' });
  }
};

exports.bloodPressure = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    // Validasi query parameter
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Parameter halaman atau batas tidak valid' });
    }

    const sensorData = await Sensor.find({ uuid });

    if (sensorData.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
    

    if (!sensorData) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const bloodPressureData = sensorData.flatMap((item) => item.blood_pressure);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBloodPressureData = bloodPressureData.slice(startIndex, endIndex);

    const totalItems = bloodPressureData.length;
    const totalPages = Math.ceil(totalItems / limit);

    const data = {
      blood_pressure: paginatedBloodPressureData,
      totalItems,
      totalPages,
    };

    if (page < totalPages) {
      data.nextPage = `/sensor/pressure/${uuid}?page=${page + 1}&limit=${limit}`;
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data blood_pressure' });
  }
};

exports.bodyWeight = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validasi query parameter
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Parameter halaman atau batas tidak valid' });
    }

    const sensorData = await Sensor.find({ uuid });

    if (sensorData.length === 0) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    const bodyWeightData = sensorData.flatMap((item) => item.body_weight);
    const bodyMassIndexData = sensorData.flatMap((item) => item.body_mass_index);

    const combinedData = {
      body_weight: bodyWeightData,
      body_mass_index: bodyMassIndexData,
    };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = {
      body_weight: bodyWeightData.slice(startIndex, endIndex),
      body_mass_index: bodyMassIndexData.slice(startIndex, endIndex),
    };

    const totalItems = bodyWeightData.length; // Total item bisa juga diambil dari bodyMassIndexData jika jumlahnya sama

    const totalPages = Math.ceil(totalItems / limit);

    const data = {
      combined_data: paginatedData,
      totalItems,
      totalPages,
    };

    if (page < totalPages) {
      data.nextPage = `/sensor/weight/${uuid}?page=${page + 1}&limit=${limit}`;
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data body_weight dan body_mass_index' });
  }
};


exports.latestData = async (req, res) => {


  const uuid = req.params.uuid;
  try {
    const latestData = await Sensor.findOne({ uuid: uuid }).sort({ start_at: -1 });

    if (!latestData) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.json(latestData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data terbaru' });
  }
}




// Akhir Mobile

// Web Dashboard
exports.avgSensor = async (req, res) => {
  try {
    // Mengambil semua dokumen
    const data = await Sensor.find({});

    // Menghitung rata-rata "value" untuk masing-masing parameter
    const averages = {};
    const parameters = [
      'blood_oxygen',
      'blood_pressure',
      'blood_sugar',
      'body_mass_index',
      'body_temperature',
      'body_weight',
      'cholesterol',
      'heart_rate',
      'hemoglobin',
      'uric_acid',
    ];

    parameters.forEach((parameter) => {
      if (parameter === 'blood_pressure') {
        // Memisahkan tekanan sistolik dan diastolik
        const pressures = data.map((item) => item[parameter]).flat();
        const systolicValues = pressures.map((data) => parseFloat(data.value.split('/')[0]));
        const diastolicValues = pressures.map((data) => parseFloat(data.value.split('/')[1]));
        
        const systolicSum = systolicValues.reduce((acc, value) => acc + value, 0);
        const diastolicSum = diastolicValues.reduce((acc, value) => acc + value, 0);
        
        const systolicAverage = systolicValues.length > 0 ? Math.round(systolicSum / systolicValues.length) : 0;
        const diastolicAverage = diastolicValues.length > 0 ? Math.round(diastolicSum / diastolicValues.length) : 0;
        
        averages['systolic_pressure'] = systolicAverage;
        averages['diastolic_pressure'] = diastolicAverage;
      } else {
        // Menghitung rata-rata untuk parameter lain
        const parameterValues = data.map((item) => item[parameter]).flat();
        const values = parameterValues.map((data) => parseFloat(data.value));
        const sum = values.reduce((acc, value) => acc + value, 0);
        const average = values.length > 0 ? Math.round(sum / values.length) : 0;
        averages[parameter] = average;
      }
    });

    res.json(averages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan.');
  }
}

exports.avgSensorstatus = async (req, res) => {
  try {
    // Mengambil semua dokumen
    const data = await Sensor.find({});

    // Menghitung jumlah "kurang normal," "normal," dan "melebihi normal" untuk masing-masing parameter
    const counts = {};
    const parameters = [
      'blood_oxygen',
      'blood_pressure',
      'blood_sugar',
      'body_mass_index',
      'body_temperature',
      'body_weight',
      'cholesterol',
      'heart_rate',
      'hemoglobin',
      'uric_acid',
    ];
    
    const statusLevels = ["kurang normal", "normal", "melebihi normal"];

    parameters.forEach((parameter) => {
      counts[parameter] = {};

      statusLevels.forEach((statusLevel) => {
        const statusValues = data
          .map((item) => item[parameter])
          .flat()
          .filter((data) => data.status === statusLevel);

        counts[parameter][statusLevel] = statusValues.length;
      });
    });

    res.json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan.');
  }
};


// pengunjung
exports.findAllDatenow = async (req, res) => {
  try {
    // Mendapatkan tanggal hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set waktu ke awal hari

    // Mencari data berdasarkan tanggal hari ini dan status 0
    const data = await Sensor.find({
      start_at: { $gte: today }, // Mencocokkan data dengan tanggal yang lebih besar atau sama dengan tanggal hari ini
      status: 0 // Mencocokkan data dengan status 0
    });

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan.');
  }
};

exports.changeStatus = async (req, res) => {
  
  try {
    // Mengambil UUID yang diberikan dalam permintaan
    const  uuid  = req.params.uuid;

    // Mengupdate data dengan UUID yang sesuai
    const updatedData = await Sensor.findOneAndUpdate(
      { uuid: uuid },
      { status: 1 }, // Mengubah status menjadi 1
      { new: true } // Mengembalikan data yang sudah diperbarui
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan.');
  }
};


