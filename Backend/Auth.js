const jwt=require('jsonwebtoken')


async function CreateToken(user_id,res){
    try{
        const token = jwt.sign({user_id},process.env.SECRET_KEY,{expiresIn:'7d'});
        return token

    }
    catch(error){
        console.log('ERROR OCCURRED',error)
    }
}
module.exports={CreateToken}