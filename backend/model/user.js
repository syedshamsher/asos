const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        max: 255,
        min: 6,
    },
    first_name:{
        type:String,
        required:true,
        min: 3,
        max: 255,
    },
    last_name:{
        type:String,
        required:true,
        min: 3,
        max: 255,
    },
    password:{
        type:String,
        required:true,
        min: 6,
        max: 1024,
    },  
    date: {
        type: Date,
        default: Date.now,
    }
},
{
    versionKey:false
});

module.exports=mongoose.model('user',userSchema);