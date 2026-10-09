require("dotenv").config();
const express=require("express"),mongoose=require("mongoose"),cors=require("cors");
const app=express();app.use(cors());app.use(express.json());app.use(express.static("../frontend"));
app.get("/api/health",(req,res)=>res.json({ok:true,app:"SmartLocal API"}));
app.use("/api/auth",require("./routes/auth"));app.use("/api/services",require("./routes/services"));app.use("/api/bookings",require("./routes/bookings"));
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/smartlocal")
.then(()=>app.listen(PORT,()=>console.log(`SmartLocal: http://localhost:${PORT}`)))
.catch(e=>{console.log("MongoDB unavailable:",e.message);app.listen(PORT,()=>console.log(`SmartLocal running without DB: http://localhost:${PORT}`));});