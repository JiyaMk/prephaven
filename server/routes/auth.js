const express=require("express");
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const {getToken}=require("../utils/helper");
router.post("/register", async(req,res)=>{
    const {email, password, firstName, lastName, username} = req.body;

    const user=await User.findOne({email: email});
    if(user){
        return res.status(403).json({error: "the user of this email already exists"});
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUserData={email, password:hashedPassword, firstName, lastName, username};
    const newUser=await User.create(newUserData);

    const token=await getToken(email, newUser);

    const UserToReturn={...newUser.toJSON(), token};
    delete UserToReturn.password;
    return res.status(200).json(UserToReturn);
});

router.post("/login", async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(403).json({err:"Invalid credentials"});
    }
    const isPwdvalid = await bcrypt.compare(password, user.password);
    if (!isPwdvalid){
        return res.status(403).json({err:"Invalid credentials"});
    }
    const token = await getToken(user.email, user);
    const userToReturn= {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports=router;