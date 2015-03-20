/**
 * Created by ravikant on 20/6/14.
 */
var fs=require("fs");
var userMS=require('../models/homeDAB.js');
var Utils=require("../../common/Utils/Utils.js");
var countryStateCity=require("../../common/models/countryStateCity.js");
var religionCaste=require("../../common/models/religion.js");
var languages=require("../../common/models/language.js");
var userType=require("../../common/models/userType.js");

module.exports=function(app,Utils){
        
    app.post("/getSrchResults",Utils.ensureRedirect,function(req,res){
    	console.log("/home/getSrchResults");
//    	 var loggedInUser=req.session.userDetails;
    	 var loggedInUser='';
        userMS.getHomeSearchResults(loggedInUser,res);
    });
    
    app.post("/getSrchResults",Utils.ensureRedirect,function(req,res){
    	console.log("/home/getSrchResults");
//    	 var loggedInUser=req.session.userDetails;
    	 var loggedInUser='';
        userMS.getHomeSearchResults(loggedInUser,res);
    });
    
}
