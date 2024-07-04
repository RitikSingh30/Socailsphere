// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
    
const opts = {
    overwrite:true,
    invalidate:true,
    resource_type:"auto",
    folder: "Socailsphere"
}

module.exports = (image) => { // image = base64
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload(image,opts,(error,result) => {
            if(result && result.secure_url){
                // console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            // console.log(error.message);
            return reject({message:error.message});
        });
    });
};
   

