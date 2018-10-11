var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var userSchema = require('../models/user');
var sequence = require('../models/sequence');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('This is for User');
});

/* Get User By User Name */
router.get('/getUserByName/:user', function (req, res, next) {
  console.log(req.params.user);
  userSchema.findOne({ name: req.params.user }).exec((err, data) => {
    if(err){
      logger.error(err);
      res.status(500).json({"message":"Error Occured.User could not be retrieved"});
  }
    else {
      console.log("User Found"+ data)
      res.status(200).json({"message":"User Found", "user" : data});  
    }
  })
})

router.post('/registration', createNewUserId, function (req, res) {
  userSchema(req.body).save((err, data) => {
    if (err) {
      logger.error(err);
      res.status(409).json({ "message": 'User Already Exist' });
    }
    else {
      logger.info('User registered successfully');
      console.log('User registered successfully');
      var msg = "User Registered with ID: " + req.body.userID + ".Please login to continue";
      res.status(200).json({ "message": msg });
    }
  });
});

router.post('/login', comparePassword, (req, res) => {
  console.log(req.body.user + " - User")
  if (req.body.user) {
    res.status(200).json({ "message": "Login Successful", "user": req.body.user });
  }

});

function createNewUserId(req, res, next) {
  var seq = new sequence();
  var id = '0';
  userSchema.find({ email: req.body.email }).exec((err, data) => {
    if (data.length === 0) {

      seq.save((err, data) => {
        //seq.resetCount((err,nextCount)=>{console.log(nextCount);});
        seq.nextCount((err, count) => {
          logger.info("New User ID Created= UI00" + count);
          console.log("New User ID Created= UI00" + count)
          req.body.userID = "UI00" + count;
          //console.log(req.body);
          next();
        });
      })

    }
    else {
      console.log("User Already Exist");
      res.status(409).json({ "message": 'User Already Exist' });
    }
  });


};

function comparePassword(req, res, next) {

  userSchema.findOne({ email: req.body.userId }, (err, data) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ "message": "Error Occured" });
    }
    else if (data === null) {
      res.status(400).json({ "message": "User not Registered" });
    }
    else if (data !== null) {
      if (req.body.password === data.password) {
        console.log(data + ": Data")
        req.body.user = data;
        next();
      }
      else {
        res.status(401).json({ "message": "Wrong Password. Please enter Right password" });
      }
    };
  });
};

router.use(createNewUserId);
router.use(comparePassword);
module.exports = router;
