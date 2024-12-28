import Profile from '../Models/Profile.js';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

export const loginVerification = async function (req, res) {
    try {
        const { EmailIdUserName , Password } = req.body;
        
        if (!EmailIdUserName || !Password) {
            return res.status(401).json({
                success: false,
                message: "All Fields are required"
            });
        }

        
        let findUserByEmail = await Profile.findOne({ Email: EmailIdUserName.toLowerCase() });
        let findUserByUserName = await Profile.findOne({ UserName: EmailIdUserName.toLowerCase() });

     
        if (!findUserByEmail && !findUserByUserName) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const userDoc = (findUserByEmail ? findUserByEmail : findUserByUserName);

        // Compare hashed password
        const isPasswordMatch = bcrypt.compareSync(Password, userDoc.Password);

      
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Creating JWT Token 
        const token = jwt.sign({Email: userDoc.Email}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        })
        
        // If credentials are correct, send success response
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token 
        });

    } catch (error) {
        // Handle server errors
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
