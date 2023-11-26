const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    cohort: Number,
    projects: [],
})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student