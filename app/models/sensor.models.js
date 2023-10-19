const mongoose = require('mongoose');

module.exports = mongoose => {
  const BloodDataSchema = new mongoose.Schema({
    duration: Number,
    start_at: Date,
    end_at: Date,
    error: Boolean,
    status: String,
    value: String,
  });

  const HealthDataSchema = new mongoose.Schema({
    id: Number,
    uuid: String,
    start_at: Date,
    end_at: Date,
    duration: Number,
    status: {
      default : 0,
      type : Number
    },
    blood_oxygen: [BloodDataSchema],
    blood_pressure: [BloodDataSchema],
    blood_sugar: [BloodDataSchema],
    body_mass_index: [BloodDataSchema],
    body_temperature: [BloodDataSchema],
    body_weight: [BloodDataSchema],
    cholesterol: [BloodDataSchema],
    heart_rate: [BloodDataSchema],
    hemoglobin: [BloodDataSchema],
    uric_acid: [BloodDataSchema],
  });

    // Middleware to set start_at and end_at before saving
    HealthDataSchema.pre('save', function (next) {
      // Set start_at and end_at to the current date and time
      this.start_at = new Date();
      this.end_at = new Date();
      next();
    });
  
  HealthDataSchema.method("toJSON",function(){
    const  {__v,_id, ...object} = this.toObject();
    object.id = _id

    return object;
})

  return mongoose.model('sensors', HealthDataSchema);

}



