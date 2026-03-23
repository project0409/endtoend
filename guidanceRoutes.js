const router = require("express").Router();
const Guidance = require("../models/guidanceModel");

// Add Guidance
router.post("/add", async (req, res) => {
    try {
        const newGuidance = new Guidance(req.body);
        await newGuidance.save();
        res.json({ message: "Guidance Added Successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Guidance
router.get("/all", async (req, res) => {
    const data = await Guidance.find();
    res.json(data);
});

module.exports = router;