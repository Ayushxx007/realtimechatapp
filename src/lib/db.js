import mongoose from "mongoose";

export async function connectDb(){
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");

  }catch(err){
    console.log("error");
  }

}

