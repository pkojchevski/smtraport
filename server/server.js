var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var Product = require('./model/Product.js');
var DailyRecord = require('./model/DailyRecord.js');
var DailyProduct = require('./model/DailyProduct.js');
var WeeklyRecord = require('./model/WeeklyRecord.js');
var WeeklyProduct = require('./model/WeeklyProduct.js');
var path = require('path');
var User = require('./model/User.js');
var moment = require('moment');


var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var LocalStrategy  = require("passport-local").Strategy;

var port = 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

app.use(express.static(__dirname+'/client/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer({ dest: './uploads/' }));


console.log("__dirname:"+__dirname);
app.use(express.static(path.join(__dirname, 'client')));

// /* GET home page. */
 app.get('/', function(req, res, next) {
   //Path to your main file
   res.status(200).sendFile(path.join(__dirname+'../client/src/index.html'));
 });

app.use(session({secret:'this is a secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' === req.method) {
  res.send(200);
}
else {
  next();
}

});

mongoose.connect('mongodb://localhost/smtraports');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("user localStrategy:"+username);
    User.findOne({
          'username' : username,
          'password' : password
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if(!user) {
            console.log('this user does not exist');
            return done(null,false);
          }
          return done(null, user);
        });
      }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  console.log("user in deserialization:"+JSON.stringify(user));
  User.findById(user._id, function(err, user) {
    done(err, user);
  })
});

var auth = function(req, res, next) {
  // if(!req.isAuthenticated()) {
  if(!req.isAuthenticated()) {
    res.send(401);
  } else
    if(req.user.role !== 'admin') {
      res.send(403);
    } else {
    next();
  }
};


app.get("/loggedin", function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
  //console.log('req:'+ JSON.stringify(req.user));
  // console.log('req.body.username', req.user['username']);
  res.send(req.user);
});

app.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});


/////////////////////////////////////////////
//////////////////Products//////////////////////////
////////////////////////////////////////////

//get All Products
app.get('/products',function(req, res) {
  Product.find({}).exec(function(err, products) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(products);
    }
  })
});

//getProductByProductIndex
app.get('/products/:productIndex', function(req, res) {
  //console.log("req.params:"+req.params);
  Product.findOne({
    "productIndex":req.params.productIndex
  }).exec(function(err, product) {
    if (err) {
      console.log("error");
    } else {
      res.json(product);
    }
  })
});

app.get('/products/description/:description', function(req, res) {
  //console.log("by opis req.params:"+JSON.stringify(req.params));
  Product.find({
    "description":{'$regex':req.params.description, $options: 'i'}
  }).exec(function(err, product) {
    if (err) {
      console.log("error");
    } else {
      res.json(product);
    }
  })
});

///Update product
app.put('/products/:id', auth, function(req,res) {
    //console.log("put:"+JSON.stringify(req.body));
  Product.findOneAndUpdate({_id:req.params.id}, req.body, function(err, product) {
        res.send(product);
      }
    );
});+


//Add product
app.post('/products', auth , function(req,res) {
  var newProduct = new Product();
//  console.log("post:"+JSON.stringify(req.body));
  newProduct.productIndex = req.body.productIndex;
  newProduct.description = req.body.description;
  newProduct.pcbsonpanel = req.body.pcbsonpanel;
  newProduct.pcbs100 = req.body.pcbs100;
  newProduct.username = req.body.username;
  newProduct.createdAt = req.body.createdAt;
  newProduct.save(function(err,product) {
    if(err) {
      res.send("error");
    } else {
      res.send(product);
    }
  });
});

/// deleteProduct
app.delete('/products/:id', auth, function(req, res) {
  console.log("delete is clicked:"+req.params.id);
   Product.remove({
     _id:req.params.id
   }, function(err,product) {
     res.send(product);
   })
});


////////////////////////////////////////////////////////
//////////////dailyRecords////////////////////////
////////////////////////////////////////////////////////////

app.get('/dailyrecords',function(req, res) {
  DailyRecord.find({}).exec(function(err, dailyRecords) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(dailyRecords);
    }
  })
});

app.get('/dailyrecords/bydate/:prodData',function(req, res) {
//  console.log("date:"+JSON.stringify(new Date(req.params.prodData)));
  DailyRecord.find({"prodData":{"$gte":+new Date(req.params.prodData)}}).exec(function(err, dailyRecords) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(dailyRecords);
      console.log("getbydate:"+ dailyRecords);
    }
  })
});

//getProductByProductIndex
app.get('/dailyrecords/:recordId', function(req, res) {
  //console.log("req.params:"+req.params);
  DailyRecord.findOne({
    "recordId":req.params.recordId
  }).exec(function(err, dailyRecord) {
    if (err) {
      console.log("error");
    } else {
      res.json(dailyRecord);
    }
  })
});

///Update product
app.put('/dailyrecords/:recordId', auth, function(req,res) {
  //  console.log("put:"+JSON.stringify(req.body));
  DailyRecord.findOneAndUpdate({
    recordId:req.params.recordId
  }, req.body, function(err, dailyRecords) {
    console.log('dailyRecords:'+dailyRecords);
            res.send(dailyRecords);
      }
    );
});


//Add product
app.post('/dailyrecords', auth, function(req,res) {
  var newDailyRecord = new DailyRecord();
//  console.log("post:"+JSON.stringify(req.body));
  newDailyRecord.name = req.body.name;
  newDailyRecord.index = req.body.index;
  newDailyRecord.value = req.body.value;
  newDailyRecord.details = req.body.details;
  newDailyRecord.prodData = req.body.prodData;
  newDailyRecord.recordId = req.body.recordId;
    newDailyRecord.details = req.body.details;
  newDailyRecord.save(function(err, dailyRecord) {
    if(err) {
      res.send("error");
    } else {
      res.send(dailyRecord);
    }
  });
});

/// deleteProduct

app.delete('/dailyrecords/:id', auth, function(req, res) {
  console.log("delete is clicked:"+ req.params.id);
   DailyRecord.remove({
    "_id":req.params.id
   }, function(err, dailyRecord) {
     res.send(dailyRecord);
   })
});

// app.delete('/dailyrecords/deleteAll', function(req, res) {
//   console.log("delete is clicked:"+ req.params.id);
//    DailyRecord.remove({}, function(err, dailyRecord) {
//      res.status(204);
//    })
// });


////////////////////////////////////////////////////////
//////////////dailyProducts////////////////////////
////////////////////////////////////////////////////////////

app.get('/dailyproducts',function(req, res) {
  DailyProduct.find({}).exec(function(err, dailyProduct) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(dailyProduct);
      console.log("dailyProduct:"+ JSON.stringify(dailyProduct))
    }
  })
});

app.get('/dailyproducts/bydate/:prodData',function(req, res) {
  //console.log("date:"+JSON.stringify(new Date(req.params.prodData)));
  DailyProduct.find({"prodData":{"$gte":+new Date(req.params.prodData)}}).exec(function(err, dailyProducts) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(dailyProducts);
      console.log("getbydate:"+ dailyProducts);
    }
  })
});

//getProductByProductIndex
app.get('/dailyproducts/:productIndex', function(req, res) {
  //console.log("req.params:"+req.params);
  DailyProduct.findOne({
    "productIndex":req.params.productIndex
  }).exec(function(err, dailyproduct) {
    if (err) {
      console.log("error");
    } else {
      res.send(dailyproduct);
    }
  })
});

///Update product
app.put('/dailyproducts/:id', auth, function(req,res) {
    //console.log("put:"+JSON.stringify(req.params));
  DailyProduct.findOneAndUpdate({
    _id:req.params.id
  }, req.body, function(err, dailyProduct) {
        res.send(dailyProduct);
      }
    );
});


//Add product
app.post('/dailyproducts', auth, function(req,res) {
  var newDailyProduct = new DailyProduct();
  //console.log("post:"+JSON.stringify(req.body));
  newDailyProduct.productIndex = req.body.productIndex;
  newDailyProduct.pcbsonpanel = req.body.pcbsonpanel;
  newDailyProduct.pcbs100 = req.body.pcbs100;
  newDailyProduct.prodData = req.body.prodData;
  newDailyProduct.description = req.body.description;
  newDailyProduct.dailyQuantity = req.body.dailyQuantity;
  newDailyProduct.productId = req.body.productId;
  newDailyProduct.save(function(err, dailyProduct) {
    if(err) {
      res.send("error");
    } else {
      res.send(dailyProduct);
    }
  });
});

/// deleteProduct
app.delete('/dailyproducts/:id', auth, function(req, res) {
  console.log("delete product is clicked:"+req.params.id);
   DailyProduct.remove({
     "_id":req.params.id
   }, function(err, dailyProduct) {
     res.send(dailyProduct);
   });
});


////////////////////////////////////////////////////////
//////////////weeklyRecords////////////////////////
////////////////////////////////////////////////////////////

app.get('/weeklyrecords',function(req, res) {
  WeeklyRecord.find({}).exec(function(err, weeklyRecords) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(weeklyRecords);
    }
  })
});

app.get('/weeklyrecords/period/:date1/:date2',function(req, res) {
  WeeklyRecord.find({dateOfProd:{"$gte":req.params.date1,
  "$lt":req.params.date2}}).exec(function(err, weeklyRecords) {
    if(err) {
      res.send('error has occured');
    } else {
      //console.log(JSON.stringify(weeklyRecords));
      res.json(weeklyRecords);
    }
  })
});

// //getProductByProductIndex
app.get('/weeklyrecords/:weeklyRecordId', function(req, res) {
  WeeklyRecord.findOne({
    "weeklyRecordId":req.params.weeklyRecordId
  }).exec(function(err, weeklyRecords) {
    if (err) {
      console.log("error");
    } else {
      res.json(weeklyRecords);
    }
  })
});

app.get('/weeklyrecords/date/:dateOfProd',function(req, res) {
  WeeklyRecord.find({"dateOfProd":new Date(req.params.dateOfProd)}).
  exec(function(err, weeklyRecord) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(weeklyRecord);
    }
  })
});

///Update product
app.put('/weeklyrecords/:id', auth, function(req,res) {
    //console.log("puuuuuuuuuuuuuut:"+JSON.stringify(req.body));
  WeeklyRecord.findOneAndUpdate({
    "_id":req.params.id
  }, req.body, function(err, weeklyRecords) {
        res.send(weeklyRecords);
      }
    );
});


//Add product
app.post('/weeklyrecords', auth, function(req,res) {
  var newWeeklyRecord = new WeeklyRecord();
//  console.log("post:"+JSON.stringify(req.body));
  newWeeklyRecord.weeklyRecordId = req.body.weeklyRecordId;
  newWeeklyRecord.name = req.body.name;
  newWeeklyRecord.text = req.body.text;
  newWeeklyRecord.value = req.body.value;
  newWeeklyRecord.dateOfProd = req.body.dateOfProd;
  newWeeklyRecord.details = req.body.details;
  newWeeklyRecord.save(function(err, weeklyRecords) {
    if(err) {
      res.send("error");
    } else {
      res.send(weeklyRecords);
    }
  });
});

/// deleteProduct
app.delete('/weeklyrecords/:id', auth, function(req, res) {
  console.log("delete is clicked:"+req.params.id);
   WeeklyRecord.remove({
     "_id":req.params.id
   }, function(err, weeklyRecords) {
     res.send(weeklyRecords);
   })
});

////////////////////////////////////////////////////////
///////////////weeklyProducts////////////////////////
////////////////////////////////////////////////////////////

app.get('/weeklyproducts',function(req, res) {
  WeeklyProduct.find({}).exec(function(err, weeklyProduct) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(weeklyProduct);
      //console.log("weeklyProduct:"+ JSON.stringify(weeklyProduct))
    }
  })
});

//getProductByProductIndex
app.get('/weeklyproducts/:productIndex', function(req, res) {
  //console.log("req.params:"+req.params);
  WeeklyProduct.findOne({
    "productIndex":req.params.productIndex
  }).exec(function(err, weeklyProduct) {
    if (err) {
      console.log("error");
    } else {
      res.json(weeklyProduct);
    }
  })
});


app.get('/weeklyproducts/date/:prodData',function(req, res) {
  //console.log("date:"+JSON.stringify(new Date(req.params.prodData)));
  WeeklyProduct.find({"prodData":new Date(req.params.prodData)}).
  exec(function(err, weeklyProducts) {
    if(err) {
      res.send('error has occured');
    } else {
      res.json(weeklyProducts);
      //console.log("getbydate:"+ weeklyProducts);
    }
  })
});

app.get('/weeklyproducts/period/:date1/:date2', function(req, res) {
  //console.log("req.params:"+req.params);
  WeeklyProduct.find({
    prodData:{
      "$gte":req.params.date1,
      "$lt":req.params.date2
  }}).exec(function(err, weeklyProduct) {
    if (err) {
      console.log("error");
    } else {
      res.json(weeklyProduct);
    }
  })
});

///Update product
app.put('/weeklyproducts/:id', auth, function(req,res) {
    //console.log("puuuuuuuuut:"+JSON.stringify(req.body));
  WeeklyProduct.findOneAndUpdate({
    _id:req.params.id
  }, req.body, function(err, weeklyProduct) {
        res.send(weeklyProduct);
      }
    );
});


//Add product
app.post('/weeklyproducts', auth, function(req,res) {
  var newWeeklyProduct = new WeeklyProduct();
  //console.log("post:"+JSON.stringify(req.body));
  newWeeklyProduct.productIndex = req.body.productIndex;
  newWeeklyProduct.pcbsonpanel = req.body.pcbsonpanel;
  newWeeklyProduct.pcbs100 = req.body.pcbs100;
  newWeeklyProduct.prodData = req.body.prodData;
  newWeeklyProduct.description = req.body.description;
  newWeeklyProduct.dailyQuantity = req.body.dailyQuantity;
  newWeeklyProduct.productId = req.body.productId;
  newWeeklyProduct.save(function(err, weeklyProduct) {
    if(err) {
      res.send("error");
    } else {
      res.send(weeklyProduct);
    }
  });
});

/// deleteProduct
app.delete('/weeklyproducts/:id', auth, function(req, res) {
  console.log("delete is clicked:"+req.params.id);
   WeeklyProduct.remove({
     _id:req.params.id
   }, function(err, weeklyProducts) {
     if(err) {
      res.send("error");
    } else {
       res.send(weeklyProducts);
    }

   })
});




var RejectRate = require('./model/RejectRate.js');


app.get('/rejectRate', function(req, res) {
        RejectRate.connect(function(rs) {
          res.json(rs);
        });
      
      });


//'Select TOP 1 recipeId FROM [IMTools].[dbo].[im_pcbmount_mount] order by dateTime desc'

// machineSerial    machineName
// Y28818    YS12F-L2-M2 - stara linia
// Y30206    YS24-L1-M2 - nowa linia
// Y30227    YS12F-L1-M4 - nowa linia
// Y30814    YS24X-L1-M3 - nowa linia
//
// /****** Script for SelectTopNRows command from SSMS  ******/
// SELECT machineSerial, recipeId, mountDone, comment, feederType, componentId, COUNT(*) as licznik
//   FROM [IMTools].[dbo].[im_pcbmount_mount]
//   where dateTime > '2017-02-09' and recipeId like 'FGBHMS%'
//   group by machineSerial, recipeId, mountDone, comment, feederType, componentId
//   order by componentId

// select *
// from Bookings
// where cast(StartTime as date) = cast('2014-02-15' as date) ;

//select * from [Janus999DB].[dbo].[tblCustomerPlay] where
//DatePlayed <  GetDate() and DatePlayed > dateadd(minute, -30, GetDate())

//   //  date = date.getUTCFullYear() + '-' +
//   //          ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
//   //          ('00' + date.getUTCDate()).slice(-2) + ' ' +
//   //          ('00' + date.getUTCHours()).slice(-2) + ':' +
//   //          ('00' + date.getUTCMinutes()).slice(-2) + ':' +
//   //          ('00' + date.getUTCSeconds()).slice(-2);
 //console.log('date:'+date);
// date = parseInt(date);

//     var mongo = require('mongodb');
//     var Server = mongo.Server;
//     var Db = mongo.Db;
// var server = new Server('localhost', 27017, {
//     auto_reconnect: true
// });
// var db = new Db('smtraports', server);
//
//
// var rejectrate=[];
// var program;
// //
// function connectToMSSQL(callback) {
// //   console.log('function is called');
// //   db.open(function(err,db) {
// //   db.collection("products", function(error, collection) {
// //       collection.find().toArray(function(err, items) {
// //         console.log('items:'+JSON.stringify(items));
// //           rejectrate = items;
// //           db.close();
// //       });
// //         callback();
// //   });
// // });

//    var conn = new sql.Connection(dbConfig);
//    var req = new sql.Request(conn);
//    var query1 = "SELECT top 1 machineSerial, recipeId FROM [IMTools].[dbo].[im_pcbmount_mount] where "+
//    "machineSerial  = 'Y30206' order by dateTime desc";
//    var query2;
//    //console.log('query2:'+query2);
//    conn.connect().then(function () {
//      var req = new sql.Request(conn);
//      var req1 = new sql.Request(conn);
//      req1.query(query1).then(function(recordset1) {
//        console.log('recordset1:'+JSON.stringify(recordset1));
//        program = recordset1[0].recipeId;
//        console.log('program:'+JSON.stringify(program));

//      console.log('program2:'+program);
//      req.query("SELECT machineSerial, mountDone, comment, feederType, componentId, COUNT(*)" +
//      "as licznik FROM [IMTools].[dbo].[im_pcbmount_mount] where dateTime >= '"+date+"'"+
//      " and recipeId =  '"+program+"'"+ "group by machineSerial, mountDone, comment, feederType, componentId").
//      then(function(recordset) {
//       console.log('recordset:'+JSON.stringify(recordset));
//       //  setInterval(function() {
//          console.log('run in interval');
//          rejectrate = recordset.slice();
//       //  }, 3000);
//        conn.close();
//           callback();
//      });
//    }).
//      catch(function (err) {
//         console.log(err);
//          conn.close();
//      });
//    }).
//    catch (function (err) {
//     console.log(err);

// });
//     callback();
// }

// function wait10sec(){
//     setTimeout(function(){
//       console.log('running setTimeout');
//         connectToMSSQL(wait10sec);
//     }, 900000);
// }

// connectToMSSQL(wait10sec);
//console.log('rejectrate:'+JSON.stringify(rejectrate));

// setInterval(function() {
//   console.log('run in interval');
//   rejectrate = connectToMSSQL();
//   console.log('rejectrate:'+rejectrate);
// }, 3000);


