const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    doctorId: { type: String, required: true, unique: true},
    affiliatedHospital: { type: String, required: true },
    password: { type: String, required: true }
});

const Professional = mongoose.model('Professional', ProfessionalSchema);
module.exports = Professional;
