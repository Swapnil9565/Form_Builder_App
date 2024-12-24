const express=require('express');
const groupModel = require('../models/groupModel');
const router=express.Router();

const authMiddleware=require("../middlewares/auth.js")

router.post("/create",authMiddleware,async (req,res)=>{
    
    const user=req.user;
    await groupModel.create({
        name:req.body.name,
        createdBy:user.id
    })
    res.status(200).json({message:"Group created successfully"});
})

router.get("/getGroups",async (req,res)=>{
    
    const allGroups=await groupModel.find();
    res.send(allGroups);
})

module.exports=router;