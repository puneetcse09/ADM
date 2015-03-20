/**
 * Created by ravikant on 20/6/14.
 */
educationMediaApp.controller('user_profile', function ($scope, $http,$state,iconClassMapping,appUtils) {
    getUserProfileData();
    $scope.toggle = true;
    function getUserProfileData(){
        $http.get('/manage-users/getUserprofileForUserName').success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
                $scope.userDetails=dataResponse.responseData;
            });
            $scope.loggedInUser=$scope.userDetails.displayObject.basicDetails[1];
            $scope.user=$scope.userDetails.displayObject;
            $scope.getUserDetails($scope.loggedInUser);
            $scope.userSelectedClone=appUtils.cloneJSObj(dataResponse.responseData.hiddenObject.userFullData);
            $scope.userSelectedClass = dataResponse.responseData.hiddenObject.userFullData;   //User Class userClass.basicDetails.userName //way to access property
//            $scope.schoolId=$scope.userSelectedClass.schoolDetails.schoolId;
            console.log("$scope.userClass @@@@@@@@@@ ",$scope.userSelectedClass,$scope.userSelectedClass.schoolDetails.schoolId);
//            console.log("success /manage-users/getUserprofileForUserName",dataResponse, "username : ", $scope.user);

        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    }
    $scope.fullName=function(user){
        if($scope.userDetails){
            var user=$scope.userDetails.basicDetails;
//            console.log("user :", user);
            var fullNameArr=[];
            user.salutation.length>0?fullNameArr.push(user.salutation):null;
            user.firstName.length>0?fullNameArr.push(user.firstName):null;
            user.middleName.length>0?fullNameArr.push(user.middleName):null;
            user.lastName.length>0?fullNameArr.push(user.lastName):null;
            
            return fullNameArr.join(" ");
        }else{
            return "";
        }

    }

    /*
     * Get user details for selected user
     */
    $scope.getUserDetails=function(user){
//      console.log("getSelectedUserDetails : ",user.userName);
        var userText = {userText: user.userName};
        var primaryKey=userText.__primaryColumn__||"userName";
        var value=user.userName;
    	
        //console.log("$scope.getUserDetails",user );
        $http({
            method : 'POST',
            url    : '/manage-users/SelectedUserDetails/',
            data   : user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            	  $scope.userSelectedClass=dataResponse.responseData;
            	  $scope.userSelectedClass.basicDetails.profileImagePath=$scope.userDetails.hiddenObject.profileImagePath;
            	  $scope.userSelectedClone=appUtils.cloneJSObj(dataResponse.responseData);
//            	  console.log("dataResponse /manage-users/getSelectedUserDetails/ :",user.userName," dataResponse : ",$scope.userSelectedClass);
             
            });
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    };

    $scope.punchTime = function(data){
        if(data == true) {
            $scope.loggedInUser['checkin'] = Date.now();
            $scope.toggle = false;
        }else if(data == false){
            $scope.loggedInUser['checkout'] = Date.now();
            $scope.toggle = true;
        }
        console.log("**************",$scope.loggedInUser);
        $http({
            method : 'POST',
            url    : '/manage-users/punchTimeCheckin/',
            data   : $scope.loggedInUser,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
                console.log("**********",dataResponse);
            });
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    };

    $scope.openModal=function(code){
    	
     	//console.log("openModal : ", code, $scope.userSelectedClass);
    	
        $scope.modalTitle="";
        $scope.modalCode=code || $scope.modalCode;
        $scope.buttonStyle='btn-primary';
//        code && code=='add'?$scope.modalTitle="Add User":"";
//        code && code=='update'?$scope.modalTitle="Update User":"";
//        code && code=='delete'?$scope.modalTitle="Delete User":"";
//        code && code=='view'?$scope.modalTitle="User Details":"";
        code && code=='updProfile'?$scope.modalTitle="Update User":"";

//        code && code=='delete'?$scope.buttonStyle="btn-danger":"btn-primary";

        $('#myTab li:first>a').click() //always open first tab
        $('#modalUpdate').modal({"backdrop": "static","show":true});
        $('#modalUpdate').modal({"show":false});
    }
    $scope.isUserPropfileMode=true;
    $scope.updateCurrentUserSession=function(){
        $http({
            method : 'POST',
            url    : '/manage-users/setUserInSession',
            data   : $scope.userSelectedClass,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
                getUserProfileData();
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });

    }

    /*
     * Dropdown JSON data of bibDocTypeMaterial
     */ 
     $http.get('/manageLibrary/getCountryStateCity').success(function(dataResponse,status,headers,config){
         //success
//         console.log("getCountryStateCity",dataResponse);
         appUtils.defaultParseResponse(dataResponse,function(dataResponse){
             $scope.countryStateCity=dataResponse;
          console.log("$scope.getCountryStateCity",$scope.getCountryStateCity);
         });

     }).error(function(data,status,headers,config){
         //error
         console.log("Error",data,status,headers,config);
     });
     
     /*
      * Dropdown JSON data of userType
      */ 
      $http.get('/manageLibrary/getUserType').success(function(dataResponse,status,headers,config){
          //success
//          console.log("getuserType",dataResponse);
          appUtils.defaultParseResponse(dataResponse,function(dataResponse){
              $scope.userType=dataResponse;
              console.log("$scope.getUserType",$scope.userType);
          });

      }).error(function(data,status,headers,config){
          //error
          console.log("Error",data,status,headers,config);
      });


 	/*
     * Dropdown JSON data of ReligionCaste
     */ 
     $http.get('/manageLibrary/getReligionCaste').success(function(dataResponse,status,headers,config){
         //success
//         console.log("ReligionCaste",dataResponse);
         appUtils.defaultParseResponse(dataResponse,function(dataResponse){
             $scope.religionCaste=dataResponse;
          console.log("$scope.ReligionCaste",$scope.ReligionCaste);
         });

     }).error(function(data,status,headers,config){
         //error
         console.log("Error",data,status,headers,config);
     });
    
     $scope.openViewSchool=function(){
 		$scope.selectedSchoolDetails=$scope.userSelectedClass.schoolDetails;
 		console.log("view : $scope.selectedSchoolDetails : ",$scope.userSelectedClass.schoolDetails.schoolId);
 		  $state.go('manageSchool.detail', { schoolId: $scope.userSelectedClass.schoolDetails.schoolId});
// 		    $scope.person = $scope.profiles[Id];
// 	    $('#viewSchoolModal li:first>a').click() //always open first tab
// 	    $('#viewSchoolModal').modal({"backdrop": "static","show":true});
 	}
     
     $scope.homeSearch=function()
     {
    	 appUtils.showError("Clicked");
     }
});
