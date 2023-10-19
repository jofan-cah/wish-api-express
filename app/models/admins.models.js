const mongoose= require("mongoose");

module.exports = mongoose => {

    const schema = mongoose.Schema({
        email: String,
        password: String,
        name: String,
        role: {
            type: String,
            default: 'admin', // Nilai default "Admin"
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


    return mongoose.model("admins",schema)
}