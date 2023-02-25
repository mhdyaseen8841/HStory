const mongoose = require('mongoose')

const specSchema = mongoose.Schema({
  specialised:{type:String,required:true}
    },
    { timestaps: true }
  );


module.exports = mongoose.model("specialization", specSchema);
