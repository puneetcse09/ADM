var Utils=require("../../common/Utils/Utils.js");
var schoolMS=require('../models/School.js');
var schoolClass = require('../models/schoolClass.js');
var Utils=require("../../common/Utils/Utils.js");
var boardOfSchool=require("../../common/models/boardOfSchools.js");
var db=Utils.getDBInstance();
console.log("db", db);

module.exports = function(app) {

    app.get("/manageSchool/getSchoolPOJO",function(req,res){
        schoolMS.getSchoolPOJO(res);
    });

    app.get("/manageSchool/getBoardOfSchool",function(req,res){
//        schoolMS.getBoardOfSchool(res);
    	res.json(boardOfSchool);
    });
    
    /* Get all School from school */
    app.get("/manageSchool/getAllSchool",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/getAllSchool");
        var loggedInUser=req.session.userDetails;
        schoolMS.getAllSchools(loggedInUser,res);
    });
    /* Get School Summary from school by Search*/
    app.post("/manageSchool/searchSchool",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/searchSchool/",req.body);
        var loggedInUser=req.session.userDetails;
        var searchObj=req.body.searchText;
        schoolMS.getSchoolsBySearch(loggedInUser,searchObj,res);
    });
//    
    /*get selected School */
    app.post("/manageSchool/getSelectedSchool",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body.schoolId;
//    	var requestobj="dav:cbse:1990:122001";
        console.log("requestobj - /manageSchool/getSelectedSchool",requestobj, req.body);
        schoolMS.getSelectedSchool(requestobj,req,res);
    });

    /* Update school  */
    app.post("/manageSchool/updateSchool",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/updateSchool");
        var loggedInUser=req.session.userDetails;
//        var schoolID=loggedInUser.schoolDetails.schoolId; 
        var schoolObj=req.body;
        console.log("/manageSchool/updateSchool : ",schoolObj);
        schoolMS.updateSchool(schoolObj,loggedInUser,res);
    });
    /* Update school  */
    app.post("/manageSchool/deleteSchool",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/deleteSchool");
        var loggedInUser=req.session.userDetails;
        var schoolObj=req.body;
        console.log("/manageSchool/deleteSchool : ",schoolObj);
        schoolMS.deleteSchool(schoolObj,loggedInUser,res);
    });
    /* Add school  */
    app.post("/manageSchool/addSchool",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/addSchool");
        var loggedInUser=req.session.userDetails;
        var schoolObj=req.body;
        console.log("/manageSchool/addSchool : ",schoolObj);
        schoolMS.addNewSchool(schoolObj,loggedInUser,res);
    });
    /* get username for add head  */
    app.post("/manageSchool/searchHead",Utils.ensureAuthenticated,function(req,res){
        console.log("/manageSchool/searchHead");
        var searchObj=req.body.userText;
        console.log("/manageSchool/searchHead : ",searchObj);
        schoolMS.searchUser(searchObj,res);
    });
}
