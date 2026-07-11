
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req:any,res:any){

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );


  if(req.method==="OPTIONS"){
    return res.status(200).end();
  }


  if(req.method!=="POST"){
    return res.status(405).json({
      error:"Method not allowed"
    });
  }


  try{

    const key = process.env.GEMINI_API_KEY;

    if(!key){
      return res.status(500).json({
        error:"Missing GEMINI_API_KEY"
      });
    }


    const body=req.body || {};

    const message =
      body.message ||
      body.question ||
      "";


    if(!message){
      return res.status(400).json({
        error:"Missing message"
      });
    }


    const genAI =
      new GoogleGenerativeAI(key);


    const model =
      genAI.getGenerativeModel({
        model:
        process.env.GEMINI_MODEL ||
        "gemini-2.0-flash"
      });


    const result =
      await model.generateContent(message);


    const text =
      result.response.text();


    return res.status(200).json({
      answer:text
    });


  }catch(error:any){

    return res.status(500).json({
      error:error.message
    });

  }

}
