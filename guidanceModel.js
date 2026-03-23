const mongoose = require("mongoose");

const guidanceSchema = new mongoose.Schema({
    companyName: String,
    jobRole: String,
    requiredSkills: [String],
    checklist: String,
    resources: String
});

module.exports = mongoose.model("PreparationGuidance", guidanceSchema);