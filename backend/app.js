
import express from 'express';
import urlShorterRouter from './src/routes/shortUrl.js';
import userRouter from './src/routes/user.js';
import cors from 'cors';

const app = express();

// if(process.env.NODE_ENV === 'Production'){
//     app.use(cors({
//         origin:process.env.DOMAIN_URL_FROENTEND}))
// }
// Middleware
app.use(express.json()); // Body parser middleware

app.get('/',(req,res)=>{
    res.json({
        'message':'hello world'
    });
})

app.get('/hello',(req,res)=>{
    res.json({
        'message':'hello world'
    });
})
// Routes
app.use('/api/v1/shorturl', urlShorterRouter);
app.use('/api/v1/user',userRouter);
app.use('*', (req,res)=>{
    res.status(404).send('Page not found');
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


export default app;
