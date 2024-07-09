 import UserModel from "../models/userModel.js";

 const handleUserSignup = async (req, res)=>{
    const {name, email, password} = user.body;

    await UserModel.create({
        name,
        email,
        password
    });
    return res.status(200).json({
        status:"ok",
        message:'signed IN'
    });
 }

 export {handleUserSignup}