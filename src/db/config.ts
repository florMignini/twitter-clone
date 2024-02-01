
import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION_URI!)
        const dbConn = mongoose.connection; 

        dbConn.on('connected', ()=>{
            console.log(`connected successfully to DB`)
        })
        dbConn.on('error', (error)=>{
            console.log(`Connection error, please reestart the proccess ${error}`)
            process.exit();
        })
    } catch (error) {
       console.log(error)
    }
}