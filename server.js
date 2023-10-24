const express = require("express")
const cors =require("cors")
const app = express()
const db = require("./app/models")


const corsOption = {
    origin: "*"
}

// Register Cors Middleware
app.use(cors(corsOption))
app.use(express.json())


const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// Konek Database
db.mongoose.connect(db.url,mongooseConfig)
.then(() => console.log("Database Conected"))
.catch(err => {
    console.log(`gagal koneksi ${err.message}`)
})

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World' });
  });



// Membuat Routememangil Routes users
require("./app/route/users.route")(app)

// Membuat Route Register Login
require("./app/route/auth.route")(app)

// Membuat Route Admin
require("./app/route/admins.route")(app)

// Mengekspor app
module.exports = app;

// membuat Route Sensor
require("./app/route/sensor.route")(app)
const PORT = process.env.PORT || 8005
// Jalankan server dan simpan referensi server dalam variabel 'server'
server = app.listen(PORT, () => console.log(`SERVER BERJALAN DI PORT ${PORT}`));

// Ekspor app dan server
module.exports = { app, server };

// Metode untuk menutup koneksi database
app.closeDatabaseConnection = () => {
    return db.mongoose.connection.close();
  };