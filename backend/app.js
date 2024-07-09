
import express from 'express';
import urlShorterRouter from './src/routes/shortUrl.js';
import userRouter from './src/routes/user.js';

const app = express();


// Middleware
app.use(express.json()); // Body parser middleware



app.get('/',(req,res)=>{
    res.send('connected');
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
