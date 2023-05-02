const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const generateToken = require("../config/generateToken");
const generateFpassToken = require("../config/generateFpassToken");
const jwt = require("jsonwebtoken")
const unirest = require("unirest");
const { ObjectId } = require('mongodb');
const { log } = require("console");

let otp=0;


const registerUser = asyncHandler(async(req, res) => {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    const { name, email, password, pic, mobno, address, city, state, zip, district, gender } = req.body;
    
    if (!name || !email || !password) {
        console.log("hloo")
        res.status(400);
        throw new Error('Please enter all fields');
    }
    try{

    
    
    const userWithSameMobNo = await User.find({ mobno });
    console.log("1111111111")
    if (userWithSameMobNo.length > 0) {
        console.log("userFind")
        const matchingUser = userWithSameMobNo.find(user => user.name.toLowerCase() === name.toLowerCase());
                if (matchingUser) {
            res.status(400);
            throw new Error('User already exists with the same name and mobile number');
        }
    }
    
    const user = await User.create({
        name,
        email,
        password,
        pic,
        mobno,
        address,
        city,
        district,
        state,
        zip,
        gender
    });
    
    if (user) {
        console.log("returnedddddddddddddddddddddddddddd")
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            mobno: user.mobno,
            gender: user.gender,
            token: generateToken(user._id)
        });
    } else {
        console.log("shafahsfsa")
        res.status(400);
        throw new Error('Invalid user data');
    }
}catch(err){
    console.log("hhuhuhuhuhuhuhuh")
console.log(err)
    res.status(401);
    throw new Error('Invalid user data');
}
});


const findUserAcc = asyncHandler(async (req, res) => {
    const { mobnum } = req.body;

    const user = await User.find({mobnum})
   
        res.json({user})
     
})


const authUser = asyncHandler(async (req, res) => {
    const { id, password } = req.body;
    const objectId = ObjectId(id);
    
    if(password){
        
        try{
            const user = await User.findOne({ _id: new ObjectId(id) })
        
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
        
    }else{
        console.log(objectId);

        try{
            const user = await User.findOne({ _id: new ObjectId(id) })
            
            console.log(user);
           
            if(user){
                //get mobnum
                mobnum=user.mobno;
           

                otp = Math.floor(100000 + Math.random() * 900000);
                console.log("mobuuuuuuuuuuuuuuuuuuuuu")
console.log(mobnum)
console.log(otp)
try{

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
        if (response.error) throw new Error(response.error);
      
        console.log(response.body);
      });
      
}catch(err){
console.log(err)
}
    //send otp to mobile
    
    //
            //
            //

            //send otp to client
                res.json({otp})
            }else{
                res.status(401)
                throw new Error('Invalid user')
            }
        } catch(err){
            console.log(err);
        }
      

         
        
    }

   
})

const otpValidate = asyncHandler(async (req, res) => {
    const {  otplocal, id } = req.body;
    const objectId = ObjectId(id);
    const user = await User.findOne({ _id: new ObjectId(id) })
    if(user){
        console.log(otplocal,otp);
        if(otplocal==otp){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                token:generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('Invalid otp')
        }

    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }   
})




const allUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {   
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { mobno: { $regex: req.query.search, $options: 'i' } },
        ],
    }:{};

    const users = await User.find(keyword).find()
    
    res.send(users)
    
});




// const allUsers = asyncHandler(async (req, res) => {

//     const keyword = req.query.search ? {   
//         $or: [
//             { name: { $regex: req.query.search, $options: 'i' } },
//             { mobno: { $regex: req.query.search, $options: 'i' } },
//         ],
//     }:{};

//     const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    
//     res.send(users)
    
// });


const forgetPassword = asyncHandler(async (req, res) => {
    const {id} = req.body;
    const objectId = ObjectId(id);
    try{

        const user = await User.findOne({ _id: new ObjectId(id) })
        if(user){
            //get email
          let  email=user.email;
            //send otp to email
            //
            //
            //
            const token = generateFpassToken(user._id)
           
            let reset= "http://localhost:3000/user/forgetpassword?token="+token
               res.json({status:"success",reset})
            
}else{
    res.status(401)
    throw new Error('Invalid user')
}
}catch(err){
    console.log(err);
    res.status(401)
    throw new Error(err.message)
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
          const user = await User.findById(decoded.id)
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

//get user detils by id

const getUserById = asyncHandler(async (req, res) => {

    const {id} = req.body
    
    const objectId = ObjectId(id);
    const user = await User.findOne({ _id: new ObjectId(id) })
    console.log(user)
    if(user){
       
      
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                mobno:user.mobno,
                address:user.address,
                city:user.city,
                district:user.district,
                state:user.state,
                zip:user.zip
            })
        
        

    }else{
        res.status(401)
        throw new Error('Invalid Id')
    }   
    
})



// const updateDoctor = asyncHandler(async (req, res) => {
//     console.log(req.body)
//     id= req.body.id
//     console.log(id)
//     const objectId = ObjectId(id);
    
//     try{
        
//         const user = await Doctor.findOne({ _id: new ObjectId(id) })
       
//         if(user){
//             console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
//             user.DocName = req.body.DocName || user.DocName
//             user.MobNum = req.body.MobNum || user.MobNum
//             user.pic = req.body.pic || user.pic
//         user.gender=req.body.gender || user.gender
//         user.Hospital = req.body.Hospital || user.Hospital
//         user.Speciality = req.body.Speciality || user.Speciality
//         user.Education = req.body.Education || user.Education
//         user.HospitalAddress = req.body.HospitalAddress || user.HospitalAddress
//         user.DocAddress = req.body.DocAddress || user.DocAddress
//         user.Experience = req.body.Experience || user.Experience
//         user.RegistrationCouncil=req.body.RegistrationCouncil || user.RegistrationCouncil
//         user.RegistrationNo=req.body.RegistrationNo || user.RegistrationNo
//         user.City=req.body.City || user.City
//         user.State=req.body.State || user.State
//         user.Zip = req.body.Zip || user.Zip





//         const options = { updateType: 'true' };
//         const updatedUser = await user.save(options)
//         res.json({
//             _id:updatedUser._id,
//             DocName:updatedUser.DocName,
//             DocEmail:updatedUser.DocEmail,
//             Speciality:updatedUser.Speciality,
//             MobNum:updatedUser.MobNum,
//             pic:updatedUser.pic,
//             status:updatedUser.status,
//             Hospital:updatedUser.Hospital,
//         })
//     }else{
//         console.log("heyyyy noooooooooooooooooooooooooooo")
//         res.status(401)
//         throw new Error('Invalid Doctor ID')
//     }
// }catch(err){
//     console.log("invalid")
//     res.status(401)
//     console.log(err)
//     throw new Error(err.message)
// }
// })

const updateUser =asyncHandler  (async(req,res)=>{
    console.log(req.body)
    id= req.body.id
    console.log(id)
    const objectId = ObjectId(id);
  
    try{
        const user = await User.findOne({ _id: new ObjectId(id) }) 
        if(user){
            console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.mobno = req.body.mobno || user.mobno
            user.pic = req.body.pic || user.pic
        user.gender=req.body.gender || user.gender
        user.address = req.body.address || user.address
        user.Hospicitytal = req.body.city || user.city
        user.district = req.body.district || user.district
        user.state = req.body.state || user.state
        user.zip = req.body.zip || user.zip







        const options = { updateType: 'true' };
        const updatedUser = await user.save(options)
        res.json({
            _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                mobno:user.mobno,
                address:user.address,
                city:user.city,
                district:user.district,
                state:user.state,
                zip:user.zip
        })
        }else{
            console.log("heyyyy noooooooooooooooooooooooooooo")
            res.status(401)
            throw new Error('Invalid user ID')
        }
    }catch(err){
        console.log(err)
        res.status(401)

    throw new Error(err.message)
    }

})


module.exports = {registerUser,authUser,allUsers,findUserAcc,otpValidate,forgetPassword,validateForgetPassword,getUserById,updateUser};
