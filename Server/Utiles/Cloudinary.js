import { v2 as cloudinary } from 'cloudinary';

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

// Upload media to cloudinary
export const cloudinaryUpload = (image) => { // image = base64
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload(image,opts,(error,result) => {
            if(result && result.secure_url){
                return resolve(result);
            }
            return reject({message:error.message});
        });
    });
};

// delete media from cloudinary
export const cloudinaryDelete = async(id) => {
    await cloudinary.uploader.destroy(id);
}
   

