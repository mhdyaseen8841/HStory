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

module.exports = {allPrescriptions,createPrescription,editPrescription};
