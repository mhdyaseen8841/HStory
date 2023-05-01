const asyncHandler = require("express-async-handler");
const Prescription = require("../model/prescriptionModel");

const generateToken = require("../config/generateToken");



const createPrescription = asyncHandler(async (req, res) => {
    const { visitDate,caseReason, advice, medicine, patient, doctor } = req.body;
   
    const prescription = await Prescription.create({
        visitDate,
        caseReason,
        advice,
        medicine,
        patient,
        doctor
    })
    if (prescription) {
        res.status(201).json({
            _id: prescription._id,
            visitDate: prescription.visitDate,
            caseReason: prescription.caseReason,
            advice: prescription.advice,
            medicine: prescription.medicine,
            patient: prescription.patient,
            doctor: prescription.doctor,
        })
    } else {
      console.log("hehehehee")
        res.status(400)
        throw new Error('Invalid prescription credentials')
    }

})

const editPrescription = asyncHandler(async (req, res) => {
      const { visitDate,caseReason, advice, medicine } = req.body;
      console.log(req.query.id)
      const prescription = await Prescription.findById(req.query.id);
      if(prescription){
         prescription.visitDate = visitDate || prescription.visitDate;
         prescription.caseReason = caseReason || prescription.caseReason;
         prescription.advice = advice || prescription.advice;
         prescription.medicine = medicine || prescription.medicine;
    
         const updatedPrescription = await prescription.save();
         res.json(updatedPrescription)
      }else{
         res.status(404)
         throw new Error("Prescription not found")
      }
})


const allPrescriptions = asyncHandler(async (req, res) => {
   let patientId = req.body.id;
   const prescription = await Prescription.find({patient:patientId}).populate("patient", "name email").populate("doctor","DocName Hospital");
   res.json(prescription)


})

const getPrescriptionById = asyncHandler(async (req, res) => {
  const  {pId} = req.body;
  console.log(pId)
    const prescription = await Prescription.findById(pId).populate("patient", "name email").populate("doctor","DocName Hospital");
    if (prescription) {
        res.json(prescription)
    } else {
        res.status(404)
        throw new Error('Prescription not found')
    }
})

//get current medicine details using date of prescription and days of medicine

const getCurrentMedicines = asyncHandler(async (req, res) => {
    const {patient} = req.body;
    console.log(req.body)
    console.log("patient:"+patient)
    
    const prescriptions = await Prescription.find({patient:patient}).populate("patient", "name email").populate("doctor","DocName Hospital");
    if (prescriptions) {
        //check if medicines is still valid
        console.log("check if medicines is still valid")
        let currentMedicines = [];
        let currentDate = new Date();
        prescriptions.forEach(prescription => {
            console.log("?????????????????????????????????")
            console.log(prescription)
            console.log("///////////////////////////////////")
            let pId= prescription._id;

            let medicine = prescription.medicine;
            let visitDate = prescription.visitDate;
//             let dateParts = visitDate.split("/");
// let d = parseInt(dateParts[0], 10);
// let month = parseInt(dateParts[1], 10) - 1; // Month is zero-indexed in JavaScript Dates
// let year = parseInt(dateParts[2], 10);
// let dateObject = new Date(year, month, d);
// dateObject.setDate(dateObject.getDate() + 10);
            // loop through medicine array
            medicine.forEach(med => {
                console.log(med)
                
                // if()
                let days = med.days;

                let mDate = med.Sdate;
                let [sDay, sMonth, sYear] = mDate.split('/');
let date2 = new Date(`${sMonth}/${sDay}/${sYear}`);
if(date2>currentDate){
    return
}
            let dateParts = mDate.split("/");
let d = parseInt(dateParts[0], 10);
let month = parseInt(dateParts[1], 10) - 1; // Month is zero-indexed in JavaScript Dates
let year = parseInt(dateParts[2], 10);
let dateObject = new Date(year, month, d);

                console.log("----------------------------")
                console.log(med.name)
                console.log(days)
                console.log(visitDate)
                

                console.log("current date is")
                console.log(currentDate)
                console.log("end date")
                let dateOb = new Date(dateObject);
let daysToAdd = med.days;
let millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
let newTime = dateOb.getTime() + millisecondsToAdd;
let resultDateString = new Date(newTime);
// let resultDateString = newDate.toISOString();

console.log("result:"+resultDateString)
console.log(typeof currentDate); 
console.log(typeof resultDateString);
const date1WithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
const date2WithoutTime = new Date(resultDateString.getFullYear(), resultDateString.getMonth(), resultDateString.getDate());

const oneDayInMs = 86400000;
const timeDiff = Math.abs(date2WithoutTime.getTime() - date1WithoutTime.getTime());
const diffDays = Math.floor(timeDiff / oneDayInMs);
                if(date1WithoutTime <= date2WithoutTime){
console.log("medicine is valid")
                   
                    let res={
                        med,
                        Vdate:visitDate,
                        pId,
                        pendingDays:diffDays,
                        SDate:mDate
                    }
                    currentMedicines.push(res);

                }else{
                    console.log("medicine is not valid")
                }
            })
        });
        res.json(currentMedicines)
    } else {
        res.status(404)
        throw new Error('Dont have Any Prescription')
    }
})



module.exports = {allPrescriptions,createPrescription,editPrescription,getPrescriptionById,getPrescriptionById,getCurrentMedicines};
