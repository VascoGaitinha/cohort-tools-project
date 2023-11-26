const mongoose = require('mongoose');

const CohortsSchema = new mongoose.Schema({
    _id: String,
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: Date,
    endDate: Date,
    programManage: String,
    leadTeacher: String,
    totalHours:Number
})

const Cohort = mongoose.model('Cohort', CohortsSchema)

module.exports = Cohort;