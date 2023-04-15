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
                res.status(401).json({ message: 'Invalid email or password' });
                throw new Error('Invalid email or password')
            }  

        }catch(err){
            console.log(err);
        }
        
   

   
})


const getpendingDoctors = asyncHandler(async (req,res)=>{
    try{
       
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
            const updatedDoctor = await doctor.save()
            
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
    

    
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
module.exports = {registerUser,authUser,getpendingDoctors,acceptdoctor,getspecialization,addspecialization,getAllUsers};
