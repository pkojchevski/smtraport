var sql = require('mssql');
var Dbconfig = require('../Dbconfig.js');
var moment = require('moment');

    var RejectRate = {
	connect: function(callback) {
	    var query1 = "SELECT top 1 machineSerial, recipeId FROM [IMTools].[dbo].[im_pcbmount_mount] where "+
           "machineSerial  = 'Y30206' order by dateTime desc";
	   var conn = new sql.Connection(Dbconfig);
	   var req = new sql.Request(conn);
	   var req1 = new sql.Request(conn);
	   var program;
	   var date = new moment().format("YYYY-MM-DD");
	   conn.connect().then(function () {
	   	req1.query(query1).then(function(recordset1) {
       	program = recordset1[0].recipeId;
        req.query("SELECT machineSerial, mountDone, comment, feederType, componentId, COUNT(*)" +
        "as licznik FROM [IMTools].[dbo].[im_pcbmount_mount] where dateTime >= '"+date+"'"+
        " and recipeId =  '"+program+"'"+ "group by machineSerial, mountDone, comment, feederType, componentId").
        then(function(recordset) {
           callback(recordset.slice());
           console.log('rejectrate:'+new Date() +JSON.stringify(recordset.slice()));
           conn.close();
     }).
     catch(function (err) {
        console.log(err);
         conn.close();
     });
   }).
   catch (function (err) {
    console.log(err);
    if(conn) conn.close();
});
	});
	      return callback;
}
 
};


module.exports = RejectRate;


