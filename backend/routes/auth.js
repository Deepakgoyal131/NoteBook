const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');//for password security
const jwt = require('jsonwebtoken');//this for more security

const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const env = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1:Create a User using: POST "api/auth/createuser" NO login required .
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email',"Enter a valid Email").isEmail(),
    body('password',"password must be at least 5 character").isLength({ min: 5 }),
], async (req,res)=>{
    //this errors show when user give invalid information (if there is errors , returm Bad request)
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      success=false; 
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
        //Check whether the user with this email exist already
    let user = await User.findOne({email: req.body.email});  
    if(user){
      success=false;
      return res.status(400).json({success, error: "This User already Exists"})
    }
    
    //for security of Password
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user:{
          id: user.id
        }
      }
     const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      success = true;
      res.json({ success, authToken});

      //show error if any technical issue
    }catch (err) {
      console.log(err.message);
      res.status(500).json({success: false,error: "Internal server Error"});
    }

  
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'please Enter a unique value for email',message: err.message})});

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body); 

     /* samjh ne ke liye he ye
     obj = {
        a:'thios',
        number: 34
    }
    res.json(obj)  this shows in localhost:3000/api/auth */
});

//ROUTE 2: Authenticate a User using: POST "api/auth/login".
router.post('/login',[
  body('email',"Enter a valid Email").isEmail(),
  body('password',"password cannot be blank").exists(),
], async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(400).json({success, errors: errors.array() });
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      
      return res.status(400).json({success, error: "please try to login with correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      ;
      return res.status(400).json({success,error: "please try to login with correct credentials"})
    }

    const data = {
      user:{
        id: user.id
      }
    }
    success = true;
   const authToken = jwt.sign(data, JWT_SECRET);
   res.json({success, authToken});
   
  } catch (err) {
      
      console.log(err.message);
      res.status(500).json({success: false,error: "Internal server Error"});
  }
      
});  

//ROUTE 3: Get loggedin Details using: POST "api/auth/getuser". login required
router.get('/getuser',fetchuser, async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({success: true, user});
  } catch (error) {
    console.log(error.message);
     res.status(500).json({success: false,error: "Internal server Error"});
  }
});

module.exports = router;