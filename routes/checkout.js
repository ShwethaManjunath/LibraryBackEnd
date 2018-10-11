var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var checkout = require('../models/checkout');

router.post('/', (req,res)=>{
    checkout.find({isbn:req.body.isbn},(err,data) => {
        if(data.length > 0){
            res.status(200).json({"message":'Book already Borrowed!!!'});
        }
        else{
            checkout(req.body).save((err, data)=>{
                if(err){
                    logger.error(err);
                    console.log(err)
                    res.status(500).json({"message":'Error Occured.Book could not be issued'});
                }
                else {
                      logger.info('Book issued successfully'+ data);
                      console.log('Book issued successfully');
                      res.status(200).json({"message":"Book issued successfully","details" : data});
                }
            });
        }
    })
    
    
});

router.get('/booksdetails', (req,res)=>{
    //console.log("Method called by client / bookdetails")
    checkout.find({}).exec((err,data)=>{
        if(data.length === 0 || err ) {

            res.status(401).json({"message":"No Book Found!!",booksdetails:null});
        }
        else{
            console.log(data);
            res.status(200).json({"message":"Books Found", booksdetails: data});
        }
    })
    
});

router.put('/bookrenewal',(req,res) =>{
    console.log(req.body);
    var myquery = { isbn:req.body.isbn };
    var newvalues = { $set: {returnDate: new Date(req.body.returnDate) } };
    checkout.updateOne(myquery,newvalues,(err,rs)=>{
        if(err){
            res.status(200).json({"message" : "Unable to update!!!"})
        }
        else{
            res.status(200).json({"message" : "successfully  updated!!!"})
        }
    })
    
})

router.delete('/:id', (req,res)=> {
   // console.log(req.params.id)
    checkout.deleteOne({isbn:req.params.id},(err,data) => {
        if(err){
            console.log(err)
            res.status(400).json({"message" : "Unable to delete!!!"})
        }
        else{
            console.log(req.params.id)
            res.status(200).json({"message" : "successfully  deleted!!!"})
        }
    })
})
module.exports = router;