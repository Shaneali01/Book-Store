const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String
})
const BookModel=mongoose.model('bookModel',Schema)
module.exports=BookModel;