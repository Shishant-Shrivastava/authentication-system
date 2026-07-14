const User = require("../models/User.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res)=>{
    try {
        const fetchedUsers = await User.find()
        res.json(fetchedUsers)
    } catch(err){
        console.error("Error Retrieving all users: ", err);   
        res.status(403).json({success: false, message: "User not found."})
    }
}

const getUserById = async (req, res)=>{
    try {
        const fetchedUser = await User.findOne({_id: req.params.id})
        res.json(fetchedUser)
    } catch(err){
        console.error("Error Retrieving all users: ", err);   
        res.status(404).json({success: false, message: "User not found."})
    }
}

const registerUser = async (req, res)=>{
    try {
        const {name, email, password, role} = req.body
        console.log("MailId: ", email);
        const userExist = await User.findOne({ email })
        if(userExist){
            res.status(409).json({success: false, message: "User already exist."})
        }
        const newUser = new User({ name, email, password, role })
        newUser.password = await bcrypt.hash( password, 10 )
        await newUser.save()
        res.status(201).json({success: true, message: "User registered successfully."})
    } catch(err){
        console.error("Error in registering user: ", err);
        res.status(500).json({success: false, message: 'Internal Server Error'}); 
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if(!userExist) {
            res.status(404).json({success: false, message: 'User not found'}); 
        }
        const isCorrectPassword = await bcrypt.compare(password, userExist.password)
        if(!isCorrectPassword){
            res.status(401).json({success: false, message: "Invalid email or password"})
        }
        const jwtToken = jwt.sign(
            { _id: userExist._id, email: userExist.email, role: userExist.role},
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        )

        res.status(200).json({
            success: true,
            email: userExist.email,
            accessToken: jwtToken
        })
        
    } catch(err){
        console.error("Error in registering user: ", err);
        res.status(500).json({success: false, message: 'Internal Server Error'}); 
    }
}

// const homePage = async(req, res) => {
//     try{
//         const role = req.user.role;

//         if(role=='admin') {
//             getAllUsers
//         }

//         res.status(200).json({success: true})
        
//     } catch (err) {
//         res.status(401).json({success: false, message: 'Bhadwa h tu'}); 
//     }
// }

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
}

