export default function handler(req:any,res:any){

res.setHeader(
"Access-Control-Allow-Origin",
"*"
);

res.status(200).json({
 status:"ok",
 model:process.env.GEMINI_MODEL || "gemini-2.0-flash",
 key:process.env.GEMINI_API_KEY 
      ? "loaded"
      : "missing"
});

}
