const asyncHandler = require("express-async-handler");
const Doctor = require("../model/DoctorModel");

const generateToken = require("../config/generateToken");
const generateFpassToken = require("../config/generateFpassToken");
const jwt = require("jsonwebtoken")
const unirest = require("unirest");

const { ObjectId } = require('mongodb');
let otp=0;

const registerDoctor =asyncHandler(async(req,res)=>{

    const {DocName,DocEmail,password,pic,MobNum,gender,Hospital,Speciality,education,HospitalAddress,DocAddress,City,IdentityProof,MedicalProof,RegYear,Experience,RegistrationCouncil,RegistrationNo,State,Zip,Sign} = req.body;
console.log(req.body)
if(!DocName || !DocEmail || !password){
    res.status(400)
    throw new Error('Please enter all fields')
}
const userExist = await Doctor.findOne({DocEmail})
if(userExist){
    res.status(400)
    throw new Error('Doctor already exist')
}
const user = await Doctor.create({
    DocName,
    DocEmail,
    MobNum,
    password,
    pic,
    gender,
    Hospital,
    Speciality,
    education,
    HospitalAddress,
    DocAddress,
    IdentityProof,MedicalProof,RegYear,Experience,RegistrationCouncil,RegistrationNo,
    City,
    State,
    Zip,
    
})

if(user){
    res.status(201).json({
        _id:user._id,
        DocName:user.DocName,
        email:user.DocEmail,
        pic:user.pic,
        MobNum:user.MobNum,
        Speciality:user.Speciality,

       
    
    })
}else{
    res.status(400)
    throw new Error('Invalid Doctor credentials')
}
})



const authDoctor = asyncHandler(async (req, res) => {
    const { DocEmail, password } = req.body;

    const user = await Doctor.findOne({DocEmail})
    ///check status
    console.log(password)
    
    if(user.status){
    if(user&& (await user.matchPassword(password))){
     //add validation for status is accepted
     if(user.status==="accepted"){
        res.json({
            _id:user._id,
            DocName:user.DocName,
            DocEmail:user.DocEmail,
            Speciality:user.Speciality,
            MobNum:user.MobNum,
            pic:user.pic,
            token:generateToken(user._id)
        })
     }else if(user.status==="pending"){
        res.status(401)
        throw new Error('Your Registration is pending')
     }else if(user.status ==="blocked"){
        let reason = user.Reason
        let err= "Blocked by admin contact admin for further actions, \n Reason:"+reason
        res.status(401)
        throw new Error(err)
     }else if(user.status==="rejected"){
        let reason = user.Reason
        let err= "Your Registration Rejected try register again, \n Reason:"+reason
res.status(401)
        throw new Error(err)
     }
     else{
        res.status(401)
        
        throw new Error('Some Error occured try later')
     }
        
    }else{
      
        res.status(401)
        throw new Error('Invalid email or password')
    }   
}else{
    res.status(401)
    throw new Error('Invalid email or password')
}
})

const sendPatientOtp = asyncHandler(async (req, res) => {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiii")
    const { mobnum } = req.body;
    console.log(req.body)
    // sendotp(mobnum)
    try{

   
    otp = Math.floor(100000 + Math.random() * 900000);
    
    var request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
    
    request.headers({
        "authorization": process.env.FAST_SMS_API
    });
    
    request.form({
        "variables_values": otp,
        "route": "otp",
        "numbers": mobnum,
    })

    request.end(function (response) {
        console.log(response)
        if (response.error) throw new Error(response.error);
      
        console.log(response.body);
      });
    // res.json({otp})
    if(otp){
        console.log("sendotp"+otp)
        res.json({msg:"success"})
    }else{
        res.status(401)
        throw new Error('error while sending otp')
    }
}catch(err){
    console.log(err)
    res.status(401)
    throw new Error('Error Occured')
  
}
})

const validatePatient = asyncHandler(async (req, res) => {
    console.log("heyehyye")
  
    console.log(req.body.otp)
    if(otp == req.body.otp){
        res.json({msg:"success"})
    }else{
        res.status(401)
        throw new Error('Invalid OTP')
    }})


    const getAlldoctors = asyncHandler(async (req, res) => {
        const doctors = await Doctor.find({ 
            status: { 
                $nin: ['pending', 'rejected'] 
            }
        })
        res.json(doctors)
    })
    

const getDoctorByID = asyncHandler(async (req, res) => {
try{

    let id = req.body.id
    if(!id){
        res.status(401)
        throw new Error('Invalid Doctor ID')
    }
    const doctors = await Doctor.findById(id)
    res.json(doctors)
}catch(err){
    res.status(401)
    throw new Error('Invalid Doctor ID')
}
})


const getDoctorBasedOnSpeciality = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        Speciality: { $regex: req.query.search, $options: 'i' } 

    }:{};

    const doctors = await Doctor.find(keyword).find({ _id: { $ne: req.user._id } })
    res.json(doctors)
})

const updateDoctor = asyncHandler(async (req, res) => {
    console.log(req.body)
    id= req.body.id
    console.log(id)
    const objectId = ObjectId(id);
    
    try{
        
        const user = await Doctor.findOne({ _id: new ObjectId(id) })
       
        if(user){
            console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            user.DocName = req.body.DocName || user.DocName
            user.MobNum = req.body.MobNum || user.MobNum
            user.pic = req.body.pic || user.pic
        user.gender=req.body.gender || user.gender
        user.Hospital = req.body.Hospital || user.Hospital
        user.Speciality = req.body.Speciality || user.Speciality
        user.Education = req.body.Education || user.Education
        user.HospitalAddress = req.body.HospitalAddress || user.HospitalAddress
        user.DocAddress = req.body.DocAddress || user.DocAddress
        user.Experience = req.body.Experience || user.Experience
        user.RegistrationCouncil=req.body.RegistrationCouncil || user.RegistrationCouncil
        user.RegistrationNo=req.body.RegistrationNo || user.RegistrationNo
        user.City=req.body.City || user.City
        user.State=req.body.State || user.State
        user.Zip = req.body.Zip || user.Zip





        const options = { updateType: 'true' };
        const updatedUser = await user.save(options)
        res.json({
            _id:updatedUser._id,
            DocName:updatedUser.DocName,
            DocEmail:updatedUser.DocEmail,
            Speciality:updatedUser.Speciality,
            MobNum:updatedUser.MobNum,
            pic:updatedUser.pic,
            status:updatedUser.status,
            Hospital:updatedUser.Hospital,
        })
    }else{
        console.log("heyyyy noooooooooooooooooooooooooooo")
        res.status(401)
        throw new Error('Invalid Doctor ID')
    }
}catch(err){
    console.log("invalid")
    res.status(401)
    console.log(err)
    throw new Error(err.message)
}
})
        
        


const searchDoc = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
      $or: [
        { DocName: { $regex: req.query.search, $options: 'i' } },
        { DocEmail: { $regex: req.query.search, $options: 'i' } },
        { Speciality: { $regex: req.query.search, $options: 'i' } }
      ],
    } : {};
  
    const doctors = await Doctor.find({
      ...keyword,
      status: 'accepted',
      _id: { $ne: req.user.id } // Exclude the logged-in doctor
    });
  
    res.send(doctors);
  });
  


const forgetpassword = asyncHandler(async (req, res) => {
    const { DocEmail } = req.body;
console.log(DocEmail)
    
    try {
        const user = await Doctor.findOne({DocEmail})
         if(user){
            const token = generateFpassToken(user._id)

         let reset= "http://localhost:3001/doctor/resetpass?token="+token
            res.json({status:"success",reset})
            }else{
                res.status(401)
                throw new Error('Invalid Email')
            }
    } catch (error) {
        console.log(error)
        res.status(401)
                throw new Error("Error occured")
    }



})

const validateForgetPassword = asyncHandler(async (req, res) => {
    const { token,password } = req.body;
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)
      if(!decoded.id){
            res.status(401)
            throw new Error('Invalid Token')
    }else{
          const user = await Doctor.findById(decoded.id)
          if(user){
              user.password = password
              
                await user.save()
              res.json({status:"success"})
          }
          else{
              res.status(401)
              throw new Error('Invalid Token')
          }

      }
       
    } catch (error) {
        console.log(error)
        res.status(401)

        throw new Error("Error occured")
    }
})


module.exports = {registerDoctor,authDoctor,searchDoc,getAlldoctors,getDoctorBasedOnSpeciality,updateDoctor,sendPatientOtp,getDoctorByID,validatePatient,forgetpassword,validateForgetPassword};
