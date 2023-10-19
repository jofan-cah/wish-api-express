const dbConfig = require("../config/database")
const mongoose = require("mongoose");



module.exports = {
    mongoose,
    url :dbConfig.url,
    users: require("./users.model.js")(mongoose),
    sensors: require("./sensor.models.js")(mongoose),
    admins : require("./admins.models.js")(mongoose)
}
