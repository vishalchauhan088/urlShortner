
import dotenv from 'dotenv';
import connectDB from './src/database/db.js';
import app from './app.js';

dotenv.config();



try{
    await connectDB();
    console.log('database connected successfully');
}
catch(err){
    console.log(err);
    
}





// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});