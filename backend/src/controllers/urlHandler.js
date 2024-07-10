
import {nanoid} from "nanoid";
import urlModel from "../models/urlModel.js";



const validateUrl = (req,res,next)=>{
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

const searchUrl = async (req,res,next)=>{
    try{
       
        const result = await urlModel.findOne({originalUrl:req.body.originalUrl});
        if(!result){
            console.log("no previous resul found for this url");
            next();
        }
        else{
            res.status(200).json({
                "status":"success",
                "url":`http://${process.env.DOMAIN}:${process.env.PORT}/api/v1/shorturl/${result.id}`
            })
        }
    }
    catch(err){
        res.status(500).json({
            "status":"failed",
        })
    }
}

const createUrl = async ( req, res)=>{
    try{
        const originalUrl = req.body.originalUrl;
        const id = nanoid(5);
        const clicks = 0;
        const newUrl = new urlModel({originalUrl,id,clicks});
        const savedUrl = await newUrl.save();

        console.log('new short url created');
        let url = `${process.env.DOMAIN}/api/v1/shorturl/${id}`;

        if (process.env.NODE_ENV === 'Development') {
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

const checkReqid = (req,res,next)=>{
    if(!req.params.id){
        res.status(500).json({
            "status":"failed",
        })
        
    }
    else{
        next();
    }
}

const urlClick = async (req,res) =>{
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

export {validateUrl,searchUrl,createUrl,urlClick,checkReqid}