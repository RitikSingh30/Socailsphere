const Profile = require('../Models/Profile');
const bcrypt = require('bcrypt-nodejs');

exports.loginVerification = async function (req, res) {
    try {
        const { Email, Password } = req.body;
        console.log("Received Email:", Email);
        console.log("Received Password:", Password);
        
        if (!Email || !Password) {
            return res.status(401).json({
                success: false,
                message: "All Fields are required"
            });
        }

        
        let userDoc = await Profile.findOne({ Email: Email.toLowerCase() });

     
        if (!userDoc) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Compare hashed password
        const isPasswordMatch = bcrypt.compareSync(Password, userDoc.Password);

      
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // If credentials are correct, send success response
        return res.status(200).json({
            success: true,
            message: "Login Successful"
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
