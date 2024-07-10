
import {nanoid} from "nanoid";
import urlModel from "../models/urlModel.js";



export const validateUrl = (req,res,next)=>{
    console.log(`request received ${req.body.originalUrl}`)
    try{
        const requrl = req.body.originalUrl;
        const myUrl = new URL(requrl.startsWith('http')? requrl:`https://${requrl}`);
        next();
    }
    catch(err){
        console.log('invalid url');
       
        res.status(500).json({
            "status":"failed",
        })
      
    }
}

// searching if url is present



export const createUrl = async ( req, res,next)=>{
    try{
        const originalUrl = req.body.originalUrl;
        const id = nanoid(5);
        const clicks = 0;
        const newUrl = new urlModel({originalUrl,id,clicks});
        const savedUrl = await newUrl.save();

        console.log('new short url created');
        let url;
        if(process.env.NODE_ENV === 'Production'){
            url = `${process.env.DOMAIN}api/v1/shorturl/${id}`;
        }
        else{
            url = `http://${process.env.DOMAIN}:${process.env.PORT}/api/v1/shorturl/${id}`;
        }
        

        res.status(200).json({
            "status":"success",
            "url":url
        })
       
        
        
    }
    catch(err){

        next(err)
        // res.status(500).json({
        //     "status":"failed",
        // })
    }

}

export const checkReqid = (req,res,next)=>{
    if(!req.params.id){
        res.status(500).json({
            "status":"failed",
        })
        
    }
    else{
        next();
    }
}

export const urlClick = async (req,res) =>{
    try{
        console.log('clicked');
        const id = req.params.id;
        console.log(id);
        const result = await urlModel.findOne({id:id});
        await urlModel.updateOne({id:id},{$inc:{clicks:1}})
        res.redirect(result.originalUrl);
        console.log(result.originalUrl);
    }
    catch(errr){
        console.log("error while redirection");
    }
}

