const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const adminSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String},
    type:{type:"String",
      default:"admin"
    },
    mobno:{type:String, required:true, unique: false},
   
    password:{type:String,required:true},
    
    pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },   
    },
    { timestaps: true }
  );
  
  adminSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword,this.password)  

}

adminSchema.pre("save", async function(next) {
    const admin = this;
    
    console.log("name" + admin.name);
  
    if (!admin.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    console.log(salt.red);
    console.log("psw" + admin.password);
    admin.password = await bcrypt.hash(admin.password, salt);
    console.log(admin.password);
  });

if (!mongoose.models.Admin) {
  const Admin = mongoose.model("Admin", adminSchema);
}

module.exports = mongoose.models.Admin;