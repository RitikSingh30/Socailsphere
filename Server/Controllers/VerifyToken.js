import jwt from 'jsonwebtoken';

export const VerifyToken = async(req,res,next) => {
    try{
        const authHeader = req.header('Authorization');

        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Access denied"
            });
        }

        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Access denied"
            });
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.Email = decode.Email;
        next();
    }catch(error){
        res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
}