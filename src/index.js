import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();
import { connectDb } from "./lib/db.js";
app.use(express.json());
app.use(cookieParser());





import authRoutes from "./routes/auth.route.js";
 import messageRoutes from "./routes/message.route.js";





app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

const PORT=process.env.PORT;



app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
  connectDb();

})


