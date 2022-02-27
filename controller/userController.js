const express =  require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {registerValidation, loginValidation} = require("../helperFunctions/validation");
const pool = require("../db.js")

const Register = async (req,res) => {
    try{
        const { error } = registerValidation(req.body);
        if (error) {
          throw Error(error.details[0].message);
        }
        
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const result = await pool.query("SELECT * FROM Account WHERE username = ($1)", [username]);
        
        if(result.rows[0]) throw Error("username has been used");

        const newUser = await pool.query
            ("INSERT INTO Account(username,email,password) VALUES($1,$2,$3) RETURNING *", 
            [username, email, hashedPassword]
        );

        const returnNewUser = newUser.rows;
        return res.status(200).json({
            message: "successfully register",
            data: { returnNewUser },
            error: false,
        });

    } catch(error){
        return res.status(400).json({
            message: error.message,
            data: [],
            error: true,
        });
    }
}

const Login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) {
          throw Error(error.details[0].message);
        }
        
        const username = req.body.username;
        const result = await pool.query("SELECT * FROM Account WHERE username = ($1)", [username])
        if (!result.rows[0]) throw Error("username doesn't exist");
        
        user = result.rows[0];
  
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) throw Error("invalid password");
        
        const token = jwt.sign(
          { id: user.id, name: user.username },
          process.env.TOKEN_SECRET
        );
        
        res.header("auth-token", token);
        return res.status(200).json({
          message: "successfully login",
          data: { token: token },
          error: false,
        });
  
    } catch (error) {
        return res.status(400).json({
          message: error.message,
          data: [],
          error: true,
        });
    }
}

// const Refresh = async(req, res) => {
//     continue
// }

const Logout = async(req, res) => {
    try {
        req.header("auth-token", " ");
        return res
            .status(200)
            .json({ message: "sucessfully logout", data: [], error: false });
    } catch (err) {
        return res
            .status(400)
            .json({ message: err.message, data: [], error: true });
    }
}

const UserController = {
    Register,
    Login,
    Logout
}

module.exports = UserController