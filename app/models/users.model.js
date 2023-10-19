const mongoose= require("mongoose");

module.exports = mongoose => {
    const schema = mongoose.Schema({
        email: String,
        password: String,
        phone : String,
        gender:String,
        name: String,
        birthday: Date,
        // refreshToken: String, // Menambahkan field refreshToken
        role: {
            type: String,
            default: 'user', // Nilai default "Admin"
          },

    },
    {
        timestamps:true
    })

    schema.method("toJSON",function(){
        const  {__v,_id, ...object} = this.toObject();
        object.id = _id

        return object;
    })


    return mongoose.model("users",schema)
}