const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    DocName:{type:String,required:true},
    MobNum:{type:String,required:true},
    DocEmail:{type:String, required:true,unique:true},
    gender:{type:String,required:true},
    Hospital:{type:String,required:true},
    Speciality:{type:String,required:true},
    education:[{
      type:mongoose.Schema.Types.ObjectId,
      degree:{type:String,required:true},
      year:{type:String,required:true},
  },],
    HospitalAddress:{type:String,required:true},
    DocAddress:{type:String,required:true},
    City:{type:String,required:true},
    State:{type:String,required:true},
    zip:{type:String,required:true},
    password:{type:String,required:true},
    pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },   
      Sign: {
        type: "String",
        required: true,
      },   
    },
    { timestaps: true }
  );

  doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)  
    }

    doctorSchema.pre("save", async function(next) {
      const user = this;
      
      console.log("name" + user.DocName);
    
      if (!user.isModified) {
        next();
      }
    
      const salt = await bcrypt.genSalt(10);
      console.log(salt.red);
      console.log("psw" + user.password);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(user.password);
    });
  
  if (!mongoose.models.User) {
    const Doctor = mongoose.model("User", doctorSchema);
  }


module.exports=Doctor



