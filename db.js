var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/EmployeeDB";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//     console.log("connected");
//       var dbo = db.db("EmployeeDB");
//     //     dbo.createCollection("Employee", function(err, res) {
//     //       if (err) throw err;
//     //       console.log("Collection created!");

//     //       db.close();
//     //     })
    
//     var myobj = [
//         { name: 'John', address: 'Highway 71'},
//         { name: 'Peter', address: 'Lowstreet 4'},
//         { name: 'Amy', address: 'Apple st 652'},
//         { name: 'Hannah', address: 'Mountain 21'},
//         { name: 'Michael', address: 'Valley 345'},
//         { name: 'Sandy', address: 'Ocean blvd 2'},
//         { name: 'Betty', address: 'Green Grass 1'},
//         { name: 'Richard', address: 'Sky st 331'},
//         { name: 'Susan', address: 'One way 98'},
//         { name: 'Vicky', address: 'Yellow Garden 2'},
//         { name: 'Ben', address: 'Park Lane 38'},
//         { name: 'William', address: 'Central st 954'},
//         { name: 'Chuck', address: 'Main Road 989'},
//         { name: 'Viola', address: 'Sideway 1633'}
//       ];

//     //insert data into collection 

//     // dbo.collection('Employee').insertMany( myobj, function(err, res) {
//     //     if (err) throw err;
//     //     console.log("Number of documents inserted: " + res.insertedCount);
//     //     db.close();
//     // })

//     //cursor to find complete doc/data

//     // var cursor = dbo.collection('Employee').findOne({});

//     // cursor.each(function (err, doc) {

//     //     console.log(doc);
//     //     db.close()
//     // });

//     //findOne finds a single record
//     // dbo.collection("Employee").findOne({}, function(err, result) {
//     //     if (err) throw err;
//     //     console.log(result.name);
//     //     db.close();
//     //   });

//     //projection object that describes which fields to include in the result.
//     //This parameter is optional, and if omitted, all fields will be included in the result.
//     // dbo.collection("Employee").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
//     //     if (err) throw err;
//     //     console.log(result);
//     //     db.close();
//     //   });
// });

var str = '';
var data = []

app.route('/Employeeid').get(function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    console.log("connected to EmployeeDB");

    var dbo = db.db("EmployeeDB");

    // var cursor = dbo.collection('Employee').find();

    // cursor.each(function (err, item) {

    //   if (item != null) {
    //     str += "    Employee Name  " + item.name + "</br>" + "  Employee address " + item.address + "</br>";
    //   }

    // });
    // if(str){
    //   data.push(str)
    //   res.send(data);
    // }
    // db.close();

    dbo.collection("Employee").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

var server = app.listen(3000, function() {
  console.log("server is listening on 3000");
  
}); 