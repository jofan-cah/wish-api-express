

module.exports = app => {
    const sensors = require("../controller/sensor.controller")
    const router = require("express").Router()
    const db =require("../models")
    const Sensor = db.sensors
    const {verifyToken, checkRoleMiddleware} = require("../midleware/authMidleware")

    router.post("/" , verifyToken ,sensors.create)
    router.get("/", verifyToken ,sensors.findAll)
    router.delete("/:id", verifyToken, sensors.delete)

    // Endpoint untuk mengambil data blood_oxygen berdasarkan uuid
    router.get('/oxygen/:uuid',verifyToken, sensors.bloodOxygen);
    router.get('/pressure/:uuid', verifyToken ,sensors.bloodPressure);
    router.get('/weight/:uuid',verifyToken, sensors.bodyWeight);
  

    // Ambil Data terbaru
    // Mendapatkan 1 data terbaru dari setiap tipe
    router.get('/latestData/:uuid', verifyToken,sensors.latestData);
    
    
    router.get('/avgSensor',verifyToken, sensors.avgSensor)
    router.get('/avgSensorstatus', verifyToken,sensors.avgSensorstatus)
    router.get('/pengunjung',verifyToken ,checkRoleMiddleware('admin') , sensors.findAllDatenow)
    router.get('/pengunjungStatus/:uuid', verifyToken , checkRoleMiddleware('admin') , sensors.changeStatus)



    app.use("/sensor",router)
}