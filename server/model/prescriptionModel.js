const mongoose = require('mongoose')

const prescriptionSchema = mongoose.Schema({
  visitDate:{type:String,required:true},
 
  caseReason:{type:String,required:true},
  advice:{type:String,required:true},
  medicine:[{
    name:{type:String,required:true},
    rules:{type:String,required:true},
    days:{type:String,required:true},
    Sdate:{type:String,required:true},
},],
patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
},

    },
    { timestaps: true }
  );


module.exports = mongoose.model("prescription", prescriptionSchema);
