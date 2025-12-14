import { Router } from "express";
import pool from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * Create user (no auth yet)
 */
router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10)
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      user: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/users',authMiddleware,async(req,res)=>{
    try{
        const result=await pool.query(`select id, name, email, created_at from users`)

        res.status(200).json({
            status: "Success",
            users: result.rows
        })
    }
    catch(error){
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})

//login
router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const userResult= await pool.query(`select * from users where email=$1`,[email])

        if(userResult.rows.length===0){
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const user = userResult.rows[0]
        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 3️⃣ Login success
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

export default router;
