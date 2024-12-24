const mongoose=require("mongoose");

const groupSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'users',
        required:true
        }
})
const groupModel=mongoose.model("group",groupSchema);
module.exports=groupModel;