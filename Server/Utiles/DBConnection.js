import mongoose from 'mongoose';

export const DBConnection = function(){
    
    // connect to mongodb 
    mongoose.connect(process.env.MONGODB_URL);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}