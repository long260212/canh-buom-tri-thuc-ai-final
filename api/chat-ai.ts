export default async function handler(req:any,res:any){

res.setHeader(
"Access-Control-Allow-Origin",
"*"
);

res.setHeader(
"Access-Control-Allow-Methods",
"POST,OPTIONS"
);

if(req.method==="OPTIONS"){
 return res.status(200).end();
}


if(req.method!=="POST"){
 return res.status(405).json({
 error:"Only POST allowed"
 });
}


const key=process.env.GEMINI_API_KEY;


if(!key){
 return res.status(500).json({
 error:"Missing GEMINI_API_KEY"
 });
}


const message=req.body?.message;


if(!message){
 return res.status(400).json({
 error:"Missing message"
 });
}



try{

const response=
await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

contents:[
{
parts:[
{
text:message
}
]
}
]

})

});


const data=await response.json();


const text=
data.candidates?.[0]
?.content?.parts?.[0]
?.text
||
"Không có câu trả lời";


res.status(200).json({
reply:text
});


}
catch(error){

res.status(500).json({
error:"Gemini server error"
});

}

}
