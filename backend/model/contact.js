const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const contactSchema=new Schema({
    id:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },  
    location:{
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    }
},
{
    versionKey:false
});

module.exports=mongoose.model('contact',contactSchema);