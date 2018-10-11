var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var bookSchema = require('../models/book');

console.log("Book page");
router.get('/getallbooks', function(req, res) {
    console.log("Getting All Books");
    bookSchema.find({}).exec((err,data)=>{
		if(err){
			logger.error(err);
            res.status(500).json({"message":"Error Occured.Books could not be fetched"});
		}
		else {
            if(data.length>0) {
                console.log("Books found");
                res.status(200).json({"message":"Books Found", "books":data});
            }
            else {
                console.log("Books are not present in DataBase");
                res.status(400).json({"message":"Books are not present in DataBase"});
            }
        }
	});
});
router.get('/:isbnNo', function(req, res) {
    console.log(req.params.isbnNo);
    bookSchema.find({isbn:req.params.isbnNo}).exec((err,data)=>{
        if(err){
            logger.error(err);
            res.status(500).json({"message":"Error Occured.Book could not be saved"});
        }
        else {
            if(data.length>0) {
                console.log("Book found");
                res.status(200).json({"message":"Book Found", "book":data});
            }
            else {
                console.log("Book is not present in DataBase");
                res.status(400).json({"message":"Book is not present in DataBase"});
            }
        }
    });
});



router.post('/updateBook', function(req, res) {
    bookSchema.findOneAndUpdate({isbn:req.body.isbn}, {
        title:req.body.title, 
        author:req.body.author,
        publishDate:req.body.publishDate,
        publisher:req.body.publisher,
        url:req.body.url,
        picUrl :req.body.picUrl,
        totalPage :req.body.totalPage,
        category :req.body.category,
        quantity :req.body.quantity
    }, (err,data)=>{
        if(err) {
            logger.error(err);
            res.status(500).json({"message":"Error Occured.Book details could not be updated"});
        }
        else {
            console.log("Book detials Updated");
            res.status(200).json({"message":"Book Details Updated"});
        }
    })
});

module.exports = router;
