import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./lib/db.js";



import authRoutes from "./routes/auth.route.js";



const app=express();

app.use("/api/auth",authRoutes);

const PORT=process.env.PORT;



app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
  connectDb();

})

app.get("/mahika",(req,res)=>res.send("mahika"));
