const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/prepGuidanceDB")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

app.use("/api/guidance", require("./routes/guidanceRoutes"));

app.listen(7000, () => {
    console.log("Server running on port 7000");
});