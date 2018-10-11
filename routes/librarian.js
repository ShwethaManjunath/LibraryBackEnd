var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var bookSchema = require('../models/book');

router.get('', (req,res)=>{
    res.send('This is for Librarian');
});

router.post('/addBook', (req,res)=>{
    bookSchema.find({isbn:req.body.isbn}).exec((err,detail)=>{
        if(err){
            logger.error(err);
            res.status(500).json({"message":'Error Occured.Book could not be saved'});
        }
        else {
            console.log(detail);
            if(detail.length>0) {
                res.status(200).json({"message":"Book Already Present in DataBase"});
            }
            else {
                bookSchema(req.body).save((err, data)=>{
                    if(err){
                        logger.error(err);
                        res.status(500).json({"message":'Error Occured.Book could not be saved'});
                    }
                    else {
                          logger.info('Book saved successfully'+ data);
                          console.log('Book saved successfully');
                          res.status(200).json({"message":"Book Saved successfully"});
                    }
                });
            }
        }
    });
});

module.exports = router;