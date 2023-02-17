const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true,unique:true},
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
  
  userSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword,this.password)  

}

userSchema.pre("save", async function(next) {
    const user = this;
    
    console.log("name" + user.name);
  
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
  const User = mongoose.model("User", userSchema);
}

module.exports = mongoose.models.User;