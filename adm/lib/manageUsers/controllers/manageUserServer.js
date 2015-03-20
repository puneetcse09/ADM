/**
 * Created by ravikant on 20/6/14.
 */
var fs=require("fs");
var userMS=require('../models/User.js');
var Utils=require("../../common/Utils/Utils.js");
var UserClass=require("../models/UserClass.js");
var user=new UserClass();
var countryStateCity=require("../../common/models/countryStateCity.js");
var religionCaste=require("../../common/models/religion.js");
var languages=require("../../common/models/language.js");
var userType=require("../../common/models/userType.js");

module.exports=function(app,Utils){
    app.get("/manage-users/users",function(req,res){
        console.log("Inside /manage-users/create-user");
        res.redirect("/index");
    });
    /* Get countryStateCity Drop Down Data*/
    app.get("/manageLibrary/getcountryStateCity",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manageLibrary/getcountryStateCity");
            res.json(countryStateCity);
    });
    /* Get ReligionCaste Drop Down Data*/
    app.get("/manageLibrary/getReligionCaste",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manageLibrary/getReligionCaste")
            res.json(religionCaste);
    });
    /* Get Languages Drop Down Data*/
    app.get("/manageLibrary/getLanguages",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manageLibrary/getLanguages")
            res.json(languages);
    });
    /* Get user Type Drop Down Data*/
    app.get("/manageLibrary/getUserType",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manageLibrary/getUserType")
            var clonedUserType=Utils.clone(userType);
            var loggedInUser=req.session.userDetails;
            var schoolID=loggedInUser.schoolDetails.schoolId;
            for(var key in clonedUserType){
                var tempArr=key.split("||");
                if(tempArr[0]!=schoolID){
                    delete clonedUserType[key];
                    continue;
                }
                /*if(clonedUserType[key].hasOwnProperty('public') && !clonedUserType[key].public){
                    delete clonedUserType[key];
                }*/
            }
            res.json(clonedUserType);
    });
    /* Get user Type Drop Down Data*/
    app.get("/manageLibraryNew/getUserType",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manageLibraryNew/getUserType")
            res.json(userType);
    });
    /* UserClass POJO Data Model */
    app.get("/manage-users/userClassData",Utils.ensureAuthenticated,function(req,res){
        var user=new UserClass();
        var responseObj = new Utils.Response();
        responseObj.responseData=user;
        res.json(responseObj);
    });
    /* Get all Users Count from USER */
    app.get("/manage-users/getAllUsersCount",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manage-users/getAllUsersCount");
    	 var loggedInUser=req.session.userDetails;
        userMS.getAllUserCount(loggedInUser,res);
    });
    /* Get all Users from USER */
    app.get("/manage-users/getAllUser",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manage-users/getAllUser");
    	 var loggedInUser=req.session.userDetails;
        userMS.getAllUsers(loggedInUser,res);
    });
    /* Get all Users with pagination from USER */
    app.post("/manage-users/allUserWithPage",Utils.ensureAuthenticated,function(req,res){
    	console.log("/manage-users/allUserWithPage");
    	 var loggedInUser=req.session.userDetails;
    	 var requestobj=req.body.paginationData;
        userMS.allUserWithPage(loggedInUser,requestobj,res);
    });
    /* Check availability of username  */
    app.post("/manage-users/users/userNameAvailablity",Utils.ensureAuthenticated,function(req,res){
    	var requestobj=req.body.userText;
    	console.log("Puneet /manage-users/users/userNameAvailablity",req.body);
        userMS.searchUser(requestobj,res);
    });
    /* Check availability of registration ID  */
    app.post("/manage-users/users/registrationIDAvailabity",Utils.ensureAuthenticated,function(req,res){
    	var requestobj=req.body;
        var loggedInUser=req.session.userDetails;
        var schoolID=loggedInUser.schoolDetails.schoolId;
    	console.log("Puneet /manage-users/users/registrationIDAvailabity",req.body,schoolID);
        userMS.searchRegId(requestobj,schoolID,res);
    });
    /* New User Registration */
    app.post("/manage-users/users/registerNewUser",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body;
        var loggedInUser=req.session.userDetails;
//        console.log("requestobj - registerNewUser",requestobj);
        userMS.addNewUser(requestobj,loggedInUser,res);
    });
    /* Update User */
    app.post("/manage-users/users/updateUser",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body;
        var loggedInUser=req.session.userDetails;
        var userImage=requestobj.basicDetails.profileImagePath;
        console.log("requestobj - /manage-users/users/updateUser",requestobj);
        userMS.updateUser(requestobj,userImage,loggedInUser,res);
    });
    /* Delete User */
    app.post("/manage-users/users/deleteUser",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body;
        var loggedInUser=req.session.userDetails;
        console.log("requestobj - /manage-users/users/deleteUser",requestobj);
        userMS.deleteUser(requestobj,loggedInUser,res);
    });
    /* Search the User from textBox*/
    app.post("/manage-users/searchUser/",Utils.ensureAuthenticated,function(req,res){
        var searchObj=req.body;
        var loggedInUser=req.session.userDetails;
        var schoolID=loggedInUser.schoolDetails.schoolId;
        Utils.searchUser(res,searchObj,schoolID);
        console.log("requestobj - search user",searchObj);
//        console.log("requestobj - registerNewUser");
        //userMS.searchUser(requestobj,res);
        
    });
    /*get selected User */
    app.post("/manage-users/SelectedUserDetails/",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body.userName;
//        console.log("requestobj - manage-users/getSelectedUserDetails",requestobj, req.body.userName);
//        console.log("requestobj - registerNewUser");
//        userMS.addNewUser(requestobj,res);
        userMS.getSelectedUser(requestobj,req,res);
    });
    /* get checkin user time */
    app.post("/manage-users/punchTimeCheckin/",Utils.ensureAuthenticated,function(req,res){
        var requestobj=req.body;
        console.log("****************************",requestobj);

    });
    app.post("/manage-users/uploadUserCSV",Utils.ensureAuthenticated,function(req,res){
        console.log("/manage-users/uploadUserCSV");

        try{
            var loggedInUser=req.session.userDetails;
            Utils.readUploadedCsv(req,res,function(responseObj){
                console.log("responseObj");
                if(!responseObj.error){
                    userMS.batchInsertUser(responseObj.responseData,loggedInUser,res);
                }else res.send(responseObj);
            });
        }catch(e){
            console.log("/manage-users/uploadUserCSV",e);
            Utils.defaultErrorResponse(res,"Failed to upload csv file.");
        }

    });
    /* Match user's existing password for setting changes*/
    app.post("/manage-users/matchExistingPassword/",Utils.ensureAuthenticated,function(req,res){
        var requestObj=req.body;
        var loggedInUser=req.session.userDetails;
        var user=req.body.user;
        var checkData=req.body.data.passwordData;
        
//        console.log("requestobj - ",requestObj," user: ",user," checkData : ",checkData);

        userMS.matchPasswordData(user,checkData,req,res);
        
    });
    /* Save settings */
    app.post("/manage-users/saveUserSettings/",Utils.ensureAuthenticated,function(req,res){
        var requestObj=req.body;
        var loggedInUser=req.session.userDetails;
        var settingsData=req.body.data.passwordData;
        var user=req.body.user;
//        console.log("requestobj - ",requestObj," user: ",user," checkData : ",checkData);

        userMS.saveUserSettings(user,settingsData,loggedInUser,req,res);
        
    });
    
    /* Save settings */
    app.post("/manage-users/resetPassword/",Utils.ensureAuthenticated,function(req,res){
        var requestObj=req.body;
        var loggedInUser=req.session.userDetails;
         var settingsData={
                    "newPassword":""
                }
        settingsData.newPassword=req.body.regID;
        var user=req.body;
        console.log("requestobj - ",requestObj," user:");

        userMS.saveUserSettings(user,settingsData,loggedInUser,req,res);
        
    });
    
}
