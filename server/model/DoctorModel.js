const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const doctorSchema = mongoose.Schema({
    DocName:{type:String,required:true},
    type:{type:"String",
      default:"doctor"
    },
    MobNum:{type:String,required:true},
    DocEmail:{type:String, required:true,unique:true},
    gender:{type:String,required:true},
    Hospital:{type:String,required:true},
    Speciality:{type:String,required:true},
    Education:[{
      degree:{type:String,required:true},
      year:{type:String,required:true},
      college:{type:String,required:true},
  },],
  Experience:{type:String,required:true},
    HospitalAddress:{type:String,required:true},
    DocAddress:{type:String,required:true},
    City:{type:String,required:true},
    State:{type:String,required:true},
    Zip:{type:String,required:true},
    password:{type:String,required:true},
    RegistrationNo:{type:String,required:true},
    RegistrationCouncil:{type:String,required:true},
    RegYear:{type:String,required:true},
    pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },   
      MedicalProof: {
        type: "String",
        required: true,
      }, 
      IdentityProof: {
        type: "String",
        required: true,
      }, 
    },
    { timestaps: true }
  );

  doctorSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(this.password);
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
  
  if (!mongoose.models.Doctor) {
    const Doctor = mongoose.model("Doctor", doctorSchema);
  }




module.exports = mongoose.models.Doctor;