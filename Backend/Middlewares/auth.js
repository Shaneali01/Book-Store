const jwt=require('jsonwebtoken')

async function verification(req,res,next){
   try{
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    const User=decoded.user_id;
    req.user=User;
    next();

   }
   catch(error){
    res.json({message:'USER NOT AUTHENTICATED'});
    console.log(error)

   }


}
module.exports={verification}
