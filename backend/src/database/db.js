import mongoose from "mongoose";

const uri = process.env.URI;
const connectDB = async ()=>{
   try{
    const databaseInstance = await mongoose.connect(uri, {
      
      
  });
    console.log('database connected successfully');
   }
   catch(err){
        console.log(`Error while connecting to database: ${err}`);
   }
}

export default connectDB;