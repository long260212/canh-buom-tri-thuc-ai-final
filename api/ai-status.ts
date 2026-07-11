export default function handler(req:any,res:any){

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  const available = !!process.env.GEMINI_API_KEY;

  res.status(200).json({

    success: true,

    isAvailable: available,

    source: available 
      ? "gemini"
      : "offline",

    model:
      process.env.GEMINI_MODEL ||
      "gemini-2.0-flash"

  });

}
