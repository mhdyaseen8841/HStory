const asyncHandler = require("express-async-handler");
const Admin = require("../model/adminModel")
const Doctor = require("../model/DoctorModel")
const User = require("../model/UserModel");

const generateToken = require("../config/generateToken");
const { ObjectId } = require('mongodb');

const specialization = require("../model/specializationModel");

const registerUser =asyncHandler(async(req,res)=>{
const {name,email,password,pic,mobno} = req.body;
if(!name || !email || !password){
    res.status(400)
    throw new Error('Please enter all fields')
}
const userExist = await Admin.findOne({email})
if(userExist){
    res.status(400)
    throw new Error('Admin already exist')
}
const user = await Admin.create({
    name,
    email,
    password,
    pic,
    mobno,
   
})

if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
}else{
    res.status(400)
    throw new Error('Invalid user data')
}
})


const authUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    
        
        try{
            const user = await Admin.findOne({ name: name })
        
            if(user&& (await user.matchPassword(password))){
                res.json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic,
                    token:generateToken(user._id)
                })
            }else{
                console.log("heyehey")
                res.status(401).json({ message: 'Invalid email or password' });
                throw new Error('Invalid email or password')
            }  

        }catch(err){
            // res.status(404)
            // throw new Error(err)
            console.log(err);
        }
        
   

   
})


const getpendingDoctors = asyncHandler(async (req,res)=>{
    try{
       
        console.log("hello")
        
        const pDoctors= await Doctor.find({status:"pending"})
        
        res.json(pDoctors)
    }catch(err){
        res.status(401).json({ message: 'Some Error Occured' });
        throw new Error('Some Error Occured')
    }
})


const getAlldoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({})
    res.json(doctors)
})

const acceptdoctor = asyncHandler(async (req, res) => {
    const { id } = req.body;
    try{
        const doctor = await Doctor.findById(id)

        if (doctor) {
      
            doctor.status = "accepted"
            console.log("doctor:")
            console.log(doctor)
            const options = { updateType: 'true' };
            const updatedDoctor = await doctor.save(options)
            console.log("updatedDoctor:")
            console.log(updatedDoctor)
            res.json({
                _id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                pic: updatedDoctor.pic,
                mobno: updatedDoctor.mobno,
                address: updatedDoctor.address,
                city: updatedDoctor.city,
                district: updatedDoctor.district,
                state: updatedDoctor.state
            })
       
           
    } else {
        res.status(404)
        throw new Error('error occured')
    }

    }catch(err){
        console.log(err);
        res.status(404)
        throw new Error(err)
    }
   
    

})

const rejectReq = asyncHandler(async (req, res) => {

    const { id,reason } = req.body;
    try{
        const doctor = await Doctor.findById(id)

        if (doctor) {
      
            doctor.status = "rejected"
            doctor.Reason=reason
            const options = { updateType: 'true' };
            const updatedDoctor = await doctor.save(options)
            
            res.json({
                _id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                pic: updatedDoctor.pic,
                mobno: updatedDoctor.mobno,
                address: updatedDoctor.address,
                city: updatedDoctor.city,
                district: updatedDoctor.district,
                state: updatedDoctor.state
            })
       
           
    } else {
        res.status(404)
        throw new Error('error occured')
    }

    }catch(err){
        console.log(err);
        res.status(404)
        throw new Error(err)
    }
   
    


})

const UnblockDoctor = asyncHandler(async (req, res) => {
    const { id } = req.body;
    try{
        const doctor = await Doctor.findById(id)

        if (doctor) {
      
            doctor.status = "accepted"
            doctor.Reason=""
            const options = { updateType: 'true' };
            const updatedDoctor = await doctor.save(options)
            
            res.json({
                _id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                pic: updatedDoctor.pic,
                mobno: updatedDoctor.mobno,
                address: updatedDoctor.address,
                city: updatedDoctor.city,
                district: updatedDoctor.district,
                state: updatedDoctor.state
            })
       
           
    } else {
        res.status(404)
        throw new Error('error occured')
    }
}catch(err){
    console.log(err);
    res.status(404)
    throw new Error(err)
}
})



const BlockDoctor = asyncHandler(async (req, res) => {
    const { id,reason } = req.body;
    try{
        const doctor = await Doctor.findById(id)
console.log(id)
        if (doctor) {
      
            doctor.status = "blocked"
            doctor.Reason=reason
            const options = { updateType: 'true' };
            const updatedDoctor = await doctor.save(options)
            
            res.json({
                _id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                pic: updatedDoctor.pic,
                mobno: updatedDoctor.mobno,
                address: updatedDoctor.address,
                city: updatedDoctor.city,
                district: updatedDoctor.district,
                state: updatedDoctor.state
            })
       
           
    } else {

        res.status(404)
        throw new Error('error occured')
    }
}catch(err){
    console.log(err);
    res.status(404)
    throw new Error(err)
}
})




const addspecialization = asyncHandler(async (req, res) => {
    const {specialised} = req.body;
    //check for already it exist
    
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

    const deleteSpecialization = asyncHandler(async (req, res) => {
        console.log(req.body)
        const { id } = req.body;
        const spec = await specialization.findById(id)
        if(spec){
            await spec.remove()
            res.json({message:'Specialization Removed'})
        }else{
            res.status(404)
            throw new Error('Specialization Not Found')
        }
    })
    
    const getRejectedDoctors = asyncHandler(async (req,res)=>{
        try{    
           
            console.log("hello")
            
            const pDoctors= await Doctor.find({status:"rejected"})
            
            res.json(pDoctors)
        }catch(err){
            res.status(401).json({ message: 'Some Error Occured' });
            throw new Error('Some Error Occured')
        }
    }
    )
    
    const getspecialization = asyncHandler(async (req, res) => {
        const spec = await specialization.find({})
        res.json(spec)
    })
    

    
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getDashboardData = asyncHandler(async (req, res) => {
    try{

        const users = await User.find({})
        const doctors = await Doctor.find({})
        const pendingDoctors = await Doctor.find({status:"pending"})
        const rejectedDoctors = await Doctor.find({status:"rejected"})
        const blockedDoctors = await Doctor.find({status:"blocked"})
        const acceptedDoctors = await Doctor.find({status:"accepted"})
        const totalDoctors = doctors.length
        const totalUsers = users.length
        const totalPendingDoctors = pendingDoctors.length
        const totalRejectedDoctors = rejectedDoctors.length
        const totalBlockedDoctors = blockedDoctors.length
        const totalAcceptedDoctors = acceptedDoctors.length
        res.json({totalDoctors,totalUsers,totalPendingDoctors,totalRejectedDoctors,totalBlockedDoctors,totalAcceptedDoctors})
    }catch(err){
        res.status(401).json({ message: 'Some Error Occured' });
        throw new Error('Some Error Occured')
    }
    
})
module.exports = {registerUser,authUser,getpendingDoctors,acceptdoctor,getDashboardData,deleteSpecialization,getspecialization,getRejectedDoctors,UnblockDoctor,addspecialization,BlockDoctor,rejectReq,getAllUsers};
