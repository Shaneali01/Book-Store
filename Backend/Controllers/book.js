const express=require('express')
const bookModel=require('../Models/bookmodel')


async function getPaidBooks(req,res){
    try{
        const Bookdata= await bookModel.find({price:{$gt:0}});
        res.json(Bookdata)
    }
    catch(error){
        console.log(error)
    }
}
async function getFreeBooks(req,res){
    try{
        const Bookdata= await bookModel.find({price:0});
        res.json(Bookdata)
    }
    catch(error){
        console.log(error)
    }
}

module.exports={getPaidBooks,getFreeBooks}