import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';



export const signup= async (req,res)=>{
  try{
    const {fullName,email,password,profilePic}=req.body;

    if(password.length<6){
      return res.status(400).json({message:"password must be atleast 6 characters"});

    }
    if(!fullName || !email || !password){
      return res.status(400).json({message:"all fields are required"});

    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message:"email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
      fullName,
      email,
      password:hashedPassword,
    });
    if(newUser){

generateToken(newUser._id,res);

      await newUser.save();
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic,
      
        

      });


    }else{
      return res.status(400).json({message:"something went wrong"});


    }


    

  }catch(err){
    console.log(err);
    res.status(500).json({message:"something went wrong"});
  }
 
  
};

export const login=async(req,res)=>{

  try{

    const {email,password}=req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"user does not exist"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"invalid credentials"});
    }
    generateToken(user._id,res);

    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic,
      
  })
    

   


  }catch(err){
    console.log(err);
    res.status(500).json({message:"something went wrong"});
  }





 
};

export const logout=(req,res)=>{

  try{

    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"user logged out"});
   
  }catch(err){

    res.status(500).json({message:"something went wrong"});
    

  }


};

export const updateProfile= async()=>{

  try{

    const {profilePic}=req.body;
    const userId=req.user._id;

    if(!profilePic){
      return res.status(400).json({message:"profile pic is required"});
      
    }
     const uploadResponse= await cloudinary.uploader.upload(profilePic);

     const updatedUser=User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

     res.staus(200).json(updatedUser);
     
      

    }
catch(err){
    console.log(err);
    res.status(500).json({message:"something went wrong"});
  }


}

export const checkAuth=async(req,res)=>{

  try{
    res.status(200).json(req.user);
  


  }catch(err){

    res.status(500).json({message:"something went wrong"});

  }
  

}

