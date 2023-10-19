

module.exports = app => {
    const sensors = require("../controller/sensor.controller")
    const router = require("express").Router()
    const db =require("../models")
    const Sensor = db.sensors
    const verifyToken = require("../midleware/authMidleware")

    router.post("/" , sensors.create)
    router.get("/", sensors.findAll)
    router.delete("/:id",sensors.delete)

    // Endpoint untuk mengambil data blood_oxygen berdasarkan uuid
    router.get('/oxygen/:uuid',sensors.bloodOxygen);
    router.get('/pressure/:uuid',sensors.bloodPressure);
    router.get('/weight/:uuid',sensors.bodyWeight);
  

    // Ambil Data terbaru
    // Mendapatkan 1 data terbaru dari setiap tipe
    router.get('/latestData/:uuid', sensors.latestData);
    router.get('/avgSensor',sensors.avgSensor)
    router.get('/avgSensorstatus',sensors.avgSensorstatus)
    router.get('/pengunjung',sensors.findAllDatenow)
    router.get('/pengunjungStatus/:uuid',sensors.changeStatus)



    app.use("/sensor",router)
}