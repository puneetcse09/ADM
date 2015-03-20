var Utils = require("../../common/Utils/Utils.js");
var SchoolPOJO=require('./schoolClass.js');
var queryRepository=require('../../manageSchool/models/mngSchoolQryRepository.js');
var fs = require("fs");
var Query = require("../../common/generic/Query.js");
var boardOfSchool = require("../../common/models/boardOfSchools.js");
var db=Utils.getDBInstance();


function getSchoolPOJO(res){
    var schoolPOJO=new SchoolPOJO();
    var responseObj = new Utils.Response();
    responseObj.responseData=schoolPOJO;
    res.json(responseObj);
}
module.exports.getSchoolPOJO=getSchoolPOJO;

/* Get all Schools from school */
module.exports.getAllSchools = function(loggedInUser,res) {
	/*
	var queryAllSchools = "MATCH (n:School) RETURN n LIMIT 25";    
	*/
	 var query='';
	    dataResolver={
	        "School":{}
	    }
	    queryConfig=queryRepository.getAllSchools();
	    query=Query(queryConfig,dataResolver);
	    console.log("getAllSchools query",query);
	    if(!query.error){
	        query=query.responseData;

	        var responseObj=new Utils.Response();
	        db.cypherQuery(query,function(err,reply){
	            var responseObj=new Utils.Response();
	            if(!err && reply && reply.data){
	                responseObj.responseData=reply;
	            }else{
	                responseObj.error=true;
	            }
	            res.json(responseObj);
	        });
	    }else{
	        res.json(query);
	    }
}

/* Get all Schools from school */
module.exports.getSchoolsBySearch = function(loggedInUser, searchObj,res) {
//	var query = "MATCH (n:School) RETURN n LIMIT 25";    
	var query = 'MATCH (n:School) '
	if(searchObj){	
		query+=
		 ' where n.name =~ ".*' + searchObj + '.*" '
		+ 'OR n.schoolId =~ ".*' + searchObj + '.*" '
		+ 'OR n.schoolHeadId =~ ".*' + searchObj + '.*" '
	}
		query+=' return n';

		var responseObj=new Utils.Response();
	        db.cypherQuery(query,function(err,reply){
	        	
	            var responseObj=new Utils.Response();
	            if(!err && reply && reply.data){
	                responseObj.responseData=reply;
	                console.log("getSchoolsBySearch \n @@@@@ : reply",reply);
	            }else{
	                responseObj.error=true;
	                responseObj.errorMsg = "No Data found.";
	            }
	            res.json(responseObj);
	        });
}

/*
* Get selected School details
*/
module.exports.getSelectedSchool=function(value,req,res){
	
//	var manualQry = 'MATCH (school:School{name:"abcd"})-[:PRIMARY_ADDRESS_OF]-(pAddress:PrimaryAddress) '+
//					' WITH school,pAddress '+
//					' MATCH (school)-[:SECONDARY_ADDRESS_OF]-(sAddress:SecondaryAddress) '+
//					' WITH school,pAddress,sAddress '+
//					' MATCH (school)-[:SOCIAL_NETWORK_OF]-(sn:SocialNetwork) '+
//					' WITH school,pAddress,sAddress,sn '+
//					' WITH school,pAddress,sAddress,sn '+
//					' MATCH (school)-[:CONTACT_OF]-(contact:Contact) '+
//					' RETURN school,pAddress,sAddress,sn,contact ';
	var query='';
	var schoolDetails = new SchoolPOJO();
	var schoolId = value;
	var responseObj = new Utils.Response();
	dataResolver={
        "School":{schoolId:schoolId}
    }
    queryConfig=queryRepository.getSelectedSchoolDetails();
    query=Query(queryConfig,dataResolver);
    console.log("getSelectedSchoolDetails query",query);
    if(!query.error){
        query=query.responseData;

        var responseObj=new Utils.Response();
        db.cypherQuery(query,function(err,result){
        	
        	console.log("getSelectedSchoolDetails : results : @@@@@@@@@@@@@: ",result.data[0]);
        	var responseObj=new Utils.Response();
        	if(!err && result && result.data){
        		if (result && result.data.length > 0) {
        			var schoolDet, pAddress, sAddress, contact, socialNetwork, imageData;
    				result.columns.length > 0 ? schoolDet = result.data[0][0] : null;
    				result.columns.length > 1 ? contact = result.data[0][1] : null;
    				result.columns.length > 2 ? pAddress = result.data[0][2] : null;
    				result.columns.length > 3 ? sAddress = result.data[0][3] : null;
    				result.columns.length > 4 ? socialNetwork = result.data[0][4] : null;
                    result.columns.length > 5 ? imageData = result.data[0][5] : null;
                    
    			}
    			
    			if(schoolDet!=null){
    				schoolDetails.setSchoolDetails(schoolDet, pAddress, sAddress, contact, socialNetwork, imageData);
    				}
    			
    			console.log("schoolDetails : @@@@@@@ :",schoolDetails);
//    			responseObj.responseData = result.data[0];
    			responseObj.responseData = schoolDetails;
//    			res.json(responseObj);
            }else{
                responseObj.error=true;
    			responseObj.errorMsg = "No Data found.";
//    			res.json(responseObj);
            }
            res.json(responseObj);
        });
    }else{
        res.json(query);
    }
}

/*
 * Update School details
 */
module.exports.updateSchool = function(schoolObj,loggedInUser,res) {
	  try{
	        var responseObj = new Utils.Response();
	        var defaultErrorMsg="Failed to update School. Please contact administrator.";
	        //var findParentISBN = 'MATCH (pb{isbn:"' + parentBook.isbn + '"})-[:BELONGS_TO]->(lib)-[:LIBRARY_OF]->(school{schoolId:"'+schoolID+'"}) RETURN pb';
//            var school=schoolObj;
            var currentTimestamp=(new Date()).getTime();
            schoolObj.basicDetails.updatedAt=currentTimestamp;
            schoolObj.basicDetails.updatedBy=loggedInUser.basicDetails.userName;
            
        	schoolObj.contact.updatedBy=loggedInUser.basicDetails.userName;
        	schoolObj.contact.updatedAt=currentTimestamp;
            
        	schoolObj.primaryAddress.updatedBy=loggedInUser.basicDetails.userName;
        	schoolObj.primaryAddress.updatedAt=currentTimestamp;
            
        	schoolObj.secondaryAddress.updatedBy=loggedInUser.basicDetails.userName;
        	schoolObj.secondaryAddress.updatedAt=currentTimestamp;
            
        	schoolObj.socialNetwork.updatedBy=loggedInUser.basicDetails.userName;
        	schoolObj.socialNetwork.updatedAt=currentTimestamp;
        	
        	schoolObj.imageData.updatedBy=loggedInUser.basicDetails.userName;
        	schoolObj.imageData.updatedAt=currentTimestamp;

        	if(schoolObj.basicDetails.hasOwnProperty('establishDate') && schoolObj.basicDetails.establishDate){
        		schoolObj.basicDetails.establishDate=Utils.convertDateToTimeStamp(schoolObj.basicDetails.establishDate);
       		 }
        	
            db.updateNode(schoolObj.basicDetails._id, schoolObj.basicDetails, function(err, node){
                  if(err) throw err;
                  node === true?console.log("School updated "+schoolObj.basicDetails._id):console.log("Failed to update School details");
            });
           db.updateNode(schoolObj.contact._id, schoolObj.contact, function(err, node){
                if(err) throw err;
                node === true?console.log("contact details updated"):console.log("Failed to update contact details");
            });
            db.updateNode(schoolObj.primaryAddress._id, schoolObj.primaryAddress, function(err, node){
                if(err) throw err;
                node === true?console.log("primaryAddress details updated"):console.log("Failed to update primaryAddress details");
            });
            db.updateNode(schoolObj.secondaryAddress._id, schoolObj.secondaryAddress, function(err, node){
                if(err) throw err;
                node === true?console.log("secondaryAddress details updated"):console.log("Failed to update secondaryAddress details");
            });
            db.updateNode(schoolObj.socialNetwork._id, schoolObj.socialNetwork, function(err, node){
                if(err) throw err;
                node === true?console.log("socialNetwork details updated"):console.log("Failed to update socialNetwork details");
//                res.json(responseObj)
            });
            db.updateNode(schoolObj.imageData._id, schoolObj.imageData, function(err, node){
                if(err) throw err;
                node === true?console.log("imageData details updated"):console.log("Failed to update imageData details");
                res.json(responseObj);
            });
//            responseObj.responseData = reply;
            res.json(responseObj)

	    }catch(e){
	        console.log("updateSchool : ",e);
	        Utils.defaultErrorResponse(res,defaultErrorMsg);
	    }
}

/*
 * Delete School details
 */
module.exports.deleteSchool = function(schoolObj,loggedInUser,res) {
	  try{
	        var responseObj = new Utils.Response();
	        var defaultErrorMsg="Failed to Delete School. Please contact administrator.";
	        //var findParentISBN = 'MATCH (pb{isbn:"' + parentBook.isbn + '"})-[:BELONGS_TO]->(lib)-[:LIBRARY_OF]->(school{schoolId:"'+schoolID+'"}) RETURN pb';
//            var school=schoolObj;
            var currentTimestamp=(new Date()).getTime();
            schoolObj.basicDetails.updatedAt=currentTimestamp;
            schoolObj.basicDetails.updatedBy=loggedInUser.basicDetails.userName;
            schoolObj.basicDetails.softDelete=true;
            
            db.updateNode(schoolObj.basicDetails._id, schoolObj.basicDetails, function(err, node){
                  if(err) throw err;
                  node === true?console.log("School deleted "+schoolObj.basicDetails._id):console.log("Failed to delete School details");
            });
			
//            responseObj.responseData = reply;
            res.json(responseObj)

	    }catch(e){
	        console.log("deleteSchool : ",e);
	        Utils.defaultErrorResponse(res,defaultErrorMsg);
	    }
}

/* addNewSchool - DB Insert */
function addNewSchool(schoolObj,loggedInUser,res){
    try{
        var responseObj = new Utils.Response();
        var defaultErrorMsg="Failed to add School. Please contact administrator.";
//        var school = 'St. Paul Higher Secondary School';
//        var findUserQuery = 'MATCH (n:User{userName:"' + userObj.basicDetails.userName + '"})  RETURN n';
        var findUserQuery = 'MATCH (n:School{name:"'+ schoolObj.name +'"}) RETURN n'; 
        var currentTimestamp=(new Date()).getTime();
        
//        userObj.class=JSON.parse(userObj.class);
        db.cypherQuery(findUserQuery, function(err, result) {
            console.log("findUserQuery",err, result)
            if(err || !result || (result && result.data && result.data.length==0)){
            	
            	delete schoolObj.basicDetails._id;
            	delete schoolObj.contact._id;
                delete schoolObj.primaryAddress._id;
                delete schoolObj.secondaryAddress._id;
                delete schoolObj.socialNetwork._id;
                
                schoolObj.basicDetails.createdBy=loggedInUser.basicDetails.userName;
            	schoolObj.basicDetails.createdAt=currentTimestamp;
                
            	schoolObj.contact.createdBy=loggedInUser.basicDetails.userName;
            	schoolObj.contact.createdAt=currentTimestamp;
                
            	schoolObj.primaryAddress.createdBy=loggedInUser.basicDetails.userName;
            	schoolObj.primaryAddress.createdAt=currentTimestamp;
                
            	schoolObj.secondaryAddress.createdBy=loggedInUser.basicDetails.userName;
            	schoolObj.secondaryAddress.createdAt=currentTimestamp;
                
            	schoolObj.socialNetwork.createdBy=loggedInUser.basicDetails.userName;
            	schoolObj.socialNetwork.createdAt=currentTimestamp;
            	
            	if(schoolObj.basicDetails.hasOwnProperty('establishDate') && schoolObj.basicDetails.establishDate){
            		schoolObj.basicDetails.establishDate=Utils.convertDateToTimeStamp(schoolObj.basicDetails.establishDate);
           		 }
                
            	var dataResolver={
		            "School":schoolObj.basicDetails,
		            "Contact":schoolObj.contact,
		            "PrimaryAddress":schoolObj.primaryAddress,
		            "SecondaryAddress":schoolObj.secondaryAddress,
		            "SocialNetwork":schoolObj.socialNetwork,
		            "Image":schoolObj.imageData
                }
                
                var queryConfig=queryRepository.adddNewSchool();
                var queryObj=Query(queryConfig,dataResolver);
                
                console.log("add new user queryObj : @@@@@@@@@@: ",queryObj);
                if(!queryObj.error){
                    db.cypherQuery(queryObj.responseData,function(err,reply){
                        console.log("add new School",err,reply);
                        if(reply && reply.data.length>0){
                            var addUser=reply.data;
                                responseObj.responseData=addUser;
                                res.json(responseObj);
                            }
                    });
                    /* Test Response */
//                	responseObj.responseData=queryObj;
//                	res.json(responseObj);
                	/* Test Response */
                }else{
                    Utils.defaultErrorResponse(res,defaultErrorMsg);
                }
            }else{
                Utils.defaultErrorResponse(res,defaultErrorMsg);
            }
        });//findUserQuery end
    }catch(e){
        console.log("addNewUser",e);
        Utils.defaultErrorResponse(res,defaultErrorMsg);
    }
}
module.exports.addNewSchool=addNewSchool;


/* Search  user for user summary & userName availability*/
module.exports.searchUser = function(requestObj,res) {
	
	var query = 'MATCH (n:User) where n.userName =~ "' + requestObj + '.*" '
			+ 'OR n.firstName =~ "' + requestObj + '.*" '
			+ 'OR n.lastName =~ "' + requestObj + '.*" ' + 'OR n.regID =~ "'
			+ requestObj + '.*" return n';
	
	    console.log("searchUser query",query);
		        var responseObj=new Utils.Response();
	        db.cypherQuery(query, function(err, reply) {
		var responseObj = new Utils.Response();
		if (!err && reply && reply.data) {
			responseObj.responseData = reply;
			} else {
				responseObj.error = true;
				}
		res.json(responseObj);
	});
	   
}

/* addSchool - DB Insert */
/*
function addSchool(schoolObj,loggedInUser,res){
    try{
        var responseObj=new Utils.Response();
        var currentTimestamp=(new Date()).getTime();
        schoolObj.createdAt=currentTimestamp;
        schoolObj.createdBy=loggedInUser.basicDetails.userName;
        
        db.insertNode(schoolObj,["School"],function(err,addSchoolReply){
            console.log("addSchool",err,addSchoolReply);
            var schoolNodeID=addSchoolReply._id;
            var userNodeID=loggedInUser.basicDetails._id;
            if(!err){
                db.insertRelationship(userNodeID,schoolNodeID,"USER_OF",{},function(err,resultRel){
                    console.log("associate school TO User ",err,resultRel);
                    if(!err){
                        responseObj.responseData=schoolNodeID;
                        res.json(responseObj);
                    }else{
                        Utils.defaultErrorResponse(res,defaultErrorMsg);
                    }
                });
            }else{
                responseObj.error=true;
                responseObj.errorMsg="Failed to add school.";
                res.json(responseObj);
            }
        });
    }catch(e){
        console.log("addSchool",e);
        responseObj.error=true;
        responseObj.errorMsg="Failed to add school.";
        res.json(responseObj);
    }
}
module.exports.addSchool=addSchool;
*/









