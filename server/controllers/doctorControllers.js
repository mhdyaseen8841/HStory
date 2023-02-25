const asyncHandler = require("express-async-handler");
const Doctor = require("../model/DoctorModel");
const specialization = require("../model/specializationModel");
const generateToken = require("../config/generateToken");

const registerDoctor =asyncHandler(async(req,res)=>{

    const {DocName,DocEmail,password,pic,MobNum,gender,Hospital,Speciality,education,HospitalAddress,DocAddress,City,State,zip,Sign} = req.body;

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
    City,
    State,
    zip,
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
        res.json({
            _id:user._id,
            DocName:user.DocName,
            DocEmail:user.DocEmail,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }   
})


const addspecialization = asyncHandler(async (req, res) => {
const {specialised} = req.body;
const spec = await specialization.create({
    specialised
})

if(spec){
    res.status(201).json({
        _id:spec._id,
        specialised:spec.specialised
    })
}else{
    res.status(400)
    throw new Error('Invalid Speciality')
}

})


const getspecialization = asyncHandler(async (req, res) => {
    const spec = await specialization.find({})
    res.json(spec)
})



const getAlldoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({})
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
        ],
    }:{};

    const doctors = await Doctor.find(keyword).find({ _id: { $ne: req.user._id } })
    
    res.send(doctors)
    
});


module.exports = {registerDoctor,authDoctor,searchDoc,addspecialization,getspecialization,getAlldoctors,getDoctorBasedOnSpeciality};
