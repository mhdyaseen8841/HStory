const asyncHandler = require("express-async-handler");
const Doctor = require("../model/DoctorModel");

const generateToken = require("../config/generateToken");

const registerDoctor =asyncHandler(async(req,res)=>{

    const {DocName,DocEmail,password,pic,MobNum,gender,Hospital,Speciality,education,HospitalAddress,DocAddress,City,IdentityProof,MedicalProof,RegYear,Experience,RegistrationCouncil,RegistrationNo,State,Zip,Sign} = req.body;

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
    Sign
})

if(user){
    res.status(201).json({
        _id:user._id,
        DocName:user.DocName,
        email:user.DocEmail,
        pic:user.pic,
        MobNum:user.MobNum,
        Speciality:user.Speciality,

        token:generateToken(user._id)
    
    })
}else{
    res.status(400)
    throw new Error('Invalid Doctor credentials')
}
})



const authDoctor = asyncHandler(async (req, res) => {
    const { DocEmail, password } = req.body;

    const user = await Doctor.findOne({DocEmail})
    if(user&& (await user.matchPassword(password))){
     //add validation for status is accepted
     if(user.status==="accepted"){
        res.json({
            _id:user._id,
            DocName:user.DocName,
            DocEmail:user.DocEmail,
            pic:user.pic,
            token:generateToken(user._id)
        })
     }else if(user.status==="pending"){
        res.status(401)
        throw new Error('Your Registration is pending')
     }else if(user.status ==="blocked"){
        res.status(401)
        throw new Error('Blocked by admin contact admin for more details')
     }else{
        res.status(401)
        throw new Error('Some Error occured try later')
     }
        
    }else{
      
        res.status(401)
        throw new Error('Invalid email or password')
    }   
})




const getAlldoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({ status: { $ne: 'pending' }})
    res.json(doctors)
})


const getDoctorBasedOnSpeciality = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        Speciality: { $regex: req.query.search, $options: 'i' } 

    }:{};

    const doctors = await Doctor.find(keyword).find({ _id: { $ne: req.user._id } })
    res.json(doctors)
})


const searchDoc = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {   
        $or: [
            { DocName: { $regex: req.query.search, $options: 'i' } },
            { DocEmail: { $regex: req.query.search, $options: 'i' } },
          {Speciality: { $regex: req.query.search, $options: 'i' } }

        ],
    }:{};

    const doctors = await Doctor.find(keyword)
    
    res.send(doctors)
    
});


module.exports = {registerDoctor,authDoctor,searchDoc,getAlldoctors,getDoctorBasedOnSpeciality};
