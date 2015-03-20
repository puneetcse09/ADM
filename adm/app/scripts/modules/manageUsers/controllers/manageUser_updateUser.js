'use strict';
/**
 * Created by ravikant on 20/6/14.
 */
educationMediaApp.controller('manageUser_updateUser', function ($scope, $http,iconClassMapping,appUtils) {

    $scope.isSearchBoxOpened=false;
    $scope.openSearchBox=function(){
//        $scope.isSearchBoxOpened=!$scope.isSearchBoxOpened;
        
        $scope.modalTitle="Advanced Search";
        
        $('#modalSearchUsers').modal({"backdrop": "static","show":true});
        $('#modalSearchUsers').modal({"show":false});
    }
    
    $scope.getBackFromSearchModal=function(){
    	
        $('#modalSearchUsers').modal('hide');
    }
    
    $('.datepicker').datepicker(
        {format: 'dd/mm/yyyy',
            language: 'en',
            autoclose: true,
            weekStart: 0,
            todayHighlight:true
        });

    $scope.openUserDOB=function(){
//        console.log("date picker");
        $('#userDOB').focus();
    };
    /* UserClass POJO Data Model */
	$http.get('/manage-users/userClassData').success(
			function(dataResponse, status, headers, config) {
				// success
				console.log("/manage-users/userClassData", dataResponse);
				appUtils.defaultParseResponse(dataResponse,
						function(dataResponse) {
							$scope.userClass = dataResponse;   //User Class userClass.basicDetails.userName //way to access property
							console.log("$scope.userClass",	$scope.userClass);
						});

			}).error(function(data, status, headers, config) {
		//error
		console.log("Error", data, status, headers, config);
	});
    
	/*
	 * Get All User Summary
	 */
	$scope.displayed = [];
    if(!$scope.isUserPropfileMode){
        $http.get('/manage-users/getAllUser').success(function(dataResponse,status,headers,config){
            //success
            console.log("dataResponse /manage-users/getAllUser",dataResponse);
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
                $scope.allUserClass=dataResponse.responseData;
                $scope.displayed.push($scope.allUserClass);
            });

        }).error(function(data,status,headers,config){
                //error
                console.log("Error",data,status,headers,config);
        });
    }
  
    
    
    $scope.currentUserDetails=null;
    
    $scope.parentConfig={
    		/*"userName":"User Name",*/
            "DOB":"Date of Birth",
            "firstName":"First Name",
            "lastName":" Last Name",
            "regID":"Reg ID"
        }
    $scope.searchUserModel={
          "searchText":""
        }
    
    /*
     * Clear function for search clear text
     */
    $scope.clearSearch = function () {
        $scope.searchUserModel.searchText = "";
    };
    
    /*
     * Search User function
     */
    $scope.searchUser=function(){
    	console.log("$scope.searchUser",$scope.searchUserModel );
    	$('#modalSearchUsers').modal('hide');
        $http({
            method : 'POST',
            url    : '/manage-users/searchUser/',
            data   : $scope.searchUserModel,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
                console.log("searchUser dataResponse",dataResponse);
                $scope.allUserClass=dataResponse.responseData;
            });

        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
        $scope.isSearchBoxOpened=false;
    }
    
    $scope.resetSearchUser=function(){
        $scope.searchUserModel={
            "searchText":""
        }
    }
    /*
     * Get user details for selected user
     */
    $scope.getUserDetails=function(user,code){
      console.log("getUserDetails : ",user.userName)
      $scope.currentUserDetails='1';
        var userText = {userText: user.userName};
        var primaryKey=userText.__primaryColumn__||"userName";
        var value=user.userName;
    	
        console.log("$scope.getUserDetails",user );
        $http({
            method : 'POST',
            url    : '/manage-users/SelectedUserDetails/',
            data   : user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
//            	  $scope.userSelectedClass =  dataResponse.responseData.data[0];
            	  $scope.userSelectedClass=dataResponse.responseData;
            	  $scope.userSelectedClone=appUtils.cloneJSObj(dataResponse.responseData);
            	  console.log("dataResponse /manage-users/getSelectedUserDetails/ :",user.userName," dataResponse : ",dataResponse);
                  $scope.openModal(code);
             
            });
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    }
    
    /*
     * Create User Validation
     */
    $scope.signupForm = function() {
        if($scope.modalCode && $scope.modalCode=='delete'){
            $scope.addUpdateUser();
            return;
        };
    	var messageQue=[];
    	var errorObj={error:false,errorMsg:[]};
    	var basicDetails=$scope.userSelectedClass.basicDetails;
//    	var userClass=$scope.userSelectedClass.class;
    	console.log("basicDetailsForm " ,$scope.basicDetailsForm,"$scope.basicDetailsForm.$valid :",$scope.userSelectedClass," message : ",messageQue );

    	if(!basicDetails.regID || (basicDetails.regID && basicDetails.regID.split(" ").length>1) ){
    		errorObj.error=true;
            errorObj.errorMsg.push("Enter Registration Id provided to you.");
         }
    	if(!basicDetails.firstName || (basicDetails.firstName && basicDetails.firstName.trim().length<3) ){
    		errorObj.error=true
            errorObj.errorMsg.push("You don't have First Name ? Enter your first Name.");
		}
    	/*if(!basicDetails.lastName || (basicDetails.lastName && basicDetails.lastName.trim().length<3)){
    		errorObj.error=true;
            errorObj.errorMsg.push("What about Last name. It's needed.");
		}*/
    	/*if(!basicDetails.sex || (basicDetails.sex && basicDetails.sex.length<1)){
    		errorObj.error=true;
            errorObj.errorMsg.push("Choose your gender.");
		}*/
		/*if(!basicDetails.DOB || (basicDetails.DOB && basicDetails.DOB && basicDetails.DOB.length<6) ){
    		errorObj.error=true;
            errorObj.errorMsg.push("What is your birthday ?");
		}*/
        var contact=$scope.userSelectedClass.contact;
        var primaryAddress=$scope.userSelectedClass.primaryAddress;
        if(basicDetails.isSMSEnabled && !(contact.phonePrimary && contact.phonePrimary.trim().length>3)){
            errorObj.error=true;
            errorObj.errorMsg.push("Please enter Primary Phone number as you have enabled SMS.");
        }
        if(basicDetails.isEmailEnabled && !(contact.emailPrimary && appUtils.validateEmail(contact.emailPrimary))){
            errorObj.error=true;
            errorObj.errorMsg.push("Please enter Primary Email as you have enabled Email alerts.");
        }
        if(!((contact.phonePrimary && contact.phonePrimary.trim().length>3) ||
            (contact.emailPrimary && appUtils.validateEmail(contact.emailPrimary)) ||
            (      primaryAddress.street1
                && primaryAddress.country
                && primaryAddress.state
                && (primaryAddress.pincode && primaryAddress.pincode.length==6 )
                && primaryAddress.city
            )
            )
          ){
            errorObj.error=true;
            errorObj.errorMsg.push("Please enter Primary Phone Number or Primary Email Address or Primary Complete residential address.");
        }
        if((contact.emailSecondary!="" && !appUtils.validateEmail(contact.emailSecondary)) ){
            errorObj.error=true;
            errorObj.errorMsg.push("Please enter valid secondary email");
        }
    	if(!basicDetails.userType || (basicDetails.userType && !$scope.userType.hasOwnProperty(basicDetails.userType))){
    		errorObj.error=true;
            errorObj.errorMsg.push("User Type is not valid.");
		}
        var tempUserTpeArr=basicDetails.userType.split("||");

    	if(tempUserTpeArr && tempUserTpeArr.length==2 && tempUserTpeArr[1]=="1" && typeof $scope.userSelectedClass.userClass!='string' && $scope.modalCode=='add'){
            errorObj.error=true;
            errorObj.errorMsg.push("Please select student's class.");
		}
    	if(!basicDetails.userName || (basicDetails.userName && basicDetails.userName<3 )){
    		errorObj.error=true;
            errorObj.errorMsg.push("Create your user name.");
		}
    	var erroMsg=errorObj.errorMsg.join('<br>');
    	
    	if(errorObj.errorMsg.length>0){
    		appUtils.showError(erroMsg);	
    	}
        console.log("$scope.modalCode",$scope.modalCode);
    	if(errorObj.errorMsg.length==0 && ($scope.modalCode=='add'||$scope.modalCode=='update' ||$scope.modalCode=='updProfile')){
    		$scope.addUpdateUser();
    	}
    	
//    	console.log("$scope.userSelectedClass.userSchoolClass : ", $scope.userSelectedClass.class," ",JSON.parse($scope.userSelectedClass.class));
//    	if ($scope.basicDetailsForm.$dirty) {
//    		    	console.log("basicDetailsForm",$scope.basicDetailsForm);
//	    } else {
//	      $scope.basicDetailsForm.submitted = true;
//	    }
	  }
    
    $scope.alertText="";
    $scope.addUpdateUser=function()
    {
    	$scope.submitted = false;
    	 
    	console.log("$scope.modalTitle : User", $scope.modalTitle, $scope.modalCode);
    	if($scope.modalCode && $scope.modalCode =='add'){
    		$scope.registerNewUser();
    	}
    	else if($scope.modalCode && $scope.modalCode=='update' || $scope.modalCode=='updProfile'){
    		$('#retryModel').modal({"backdrop": "static","show":true});
    		 $scope.alertText="User details has been changed. Do you want to proceed ?";
    	}
    	else if($scope.modalCode && $scope.modalCode=='delete'){
    		$('#retryModel').modal({"backdrop": "static","show":true});
    		$scope.alertText="You are about to delete a User. Please confirm.";
    	}
    }
 
    $scope.ok=function(){
//   	console.log("retry model");
       if($scope.modelBack){
           $scope.modelBack=false;
           $('#retryModel').modal('hide');
           $('#modalUpdate').modal('hide');
       }else if($scope.modalCode && ($scope.modalCode=='update' || $scope.modalCode=='updProfile')){
		   $scope.updateUserClass();
           $('#retryModel').modal('hide');
	   }else if($scope.modalCode && $scope.modalCode=='delete'){
   			$scope.deleteUserClass();
           $('#retryModel').modal('hide');
	   }else{
           $('#retryModel').modal('hide');
       }

    }

   $scope.cancel=function(){
//  	console.log("retry model");
       if( $scope.modelBack){
           $scope.modelBack=false;
       }
  		$('#retryModel').modal('hide');
   }
    $scope.getBackFromModal=function(){
        if($scope.modalCode!='view'){
            $scope.modelBack=true;
            $('#retryModel').modal({"backdrop": "static","show":true});
            $scope.alertText="You are sure you want to go back. You will loose un-saved data.";
        }else{
            $('#modalUpdate').modal('hide');
        }


    }
    $scope.resetUserClass=function(){
    	$scope.userSelectedClass=angular.copy($scope.userSelectedClone);
//    	$scope.userForm.$setPristine();
    	$scope.basicDetailsForm.$setPristine();
    	console.log("reset changes", $scope.isUserChanged(), " $scope.basicDetailsForm.$setPristine() ", $scope.basicDetailsForm.$setPristine());
    };
    
    $scope.isUserChanged=function ()
    {
//    	console.log(angular.equals($scope.userSelectedClass, $scope.userSelectedClone));
    	return angular.equals($scope.userSelectedClass, $scope.userSelectedClone);
    };

    /*
     * Back button functionality
     */
    $scope.getBackToMainUsersList=function(){
        $scope.currentUserDetails=!$scope.currentUserDetails;
    }
 
   /*
    * Update User function call to update User
    */
    $scope.updateUserClass=function()
    {
    	//console.log("$scope.updateUserClass :",$scope.userSelectedClass, angular.equals($scope.userSelectedClass.userDetails,$scope.userSelectedClone.userDetails));
		var selectedUser = $scope.userSelectedClass.basicDetails.userName;
		$http({
			method : 'POST',
			url : '/manage-users/users/updateUser',
			data : $scope.userSelectedClass,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).success(function(dataResponse, status, headers,config) {
            // success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                console.log("updateUserClass - dataResponse",dataResponse)
                
                //$scope.userSelectedClass = dataResponse.responseData;
               
                appUtils.showSuccess("User "+selectedUser+" updated successfully");
                $('#modalUpdate').modal('hide');
                if(!$scope.isUserPropfileMode){
                    $scope.searchUser();
                }else if($scope.updateCurrentUserSession && typeof $scope.updateCurrentUserSession=='function'){
                    $scope.updateCurrentUserSession();
                    
                }

            });
        }).error(function(data, status, headers, config) {
            // error
            console.log("Error", data, status,headers, config);
        });
    }
    
    /*
	 * Submit button Method for "Add new User"
	 */
	$scope.registerNewUser = function() {
		console.log("registerUser ", $scope.userSelectedClass);
		var addedUser = $scope.userSelectedClass.basicDetails.userName;
        var tempArr=$scope.userSelectedClass.basicDetails.userType.split("||");
		if(tempArr.length==2 && tempArr[1]=="1" && typeof $scope.userSelectedClass.userClass=='string'){
			var tempClass=$scope.userSelectedClass.userClass.split('/');
			$scope.userSelectedClass.userClass=angular.copy($scope.userSelectedClone.userClass);
			console.log("tempClass ",tempClass, "$scope.userSelectedClass.userClass ",$scope.userSelectedClass.userClass);
	        var className=tempClass.length>0?tempClass[0]:'';
	        var classSection=tempClass.length>1?tempClass[1]:'';
	        className?$scope.userSelectedClass.userClass.name=className:'';
	        classSection?$scope.userSelectedClass.userClass.section=classSection:'';
	        console.log("$scope.userSelectedClass.userClass ",$scope.userSelectedClass.userClass);
		}
		
		$http({
			method : 'POST',
			url : '/manage-users/users/registerNewUser',
			data : $scope.userSelectedClass,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).success(function(dataResponse, status, headers,config) {
            // success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                console.log("registerUser - dataResponse",dataResponse)
                $scope.userSelectedClass = dataResponse.responseData;
                appUtils.showSuccess("User "+addedUser+" created successfully");
                $('#modalUpdate').modal('hide');
                $scope.searchUser();
            });
        }).error(function(data, status, headers, config) {
            // error
            console.log("Error", data, status,headers, config);
        });
    };
    
    /*
     * Delete User function call to update User
     */
     $scope.deleteUserClass=function()
     {
     	console.log("$scope.userSelectedClass :",$scope.userSelectedClass);
// 		console.log("deleteUser ", $scope.userClass);
 		$http({
 			method : 'POST',
 			url : '/manage-users/users/deleteUser',
 			data : $scope.userSelectedClass,
 			headers : {
 				'Content-Type' : 'application/json'
 			}
 		}).success(function(dataResponse, status, headers,config) {
            // success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                console.log("deleteUserClass - dataResponse",dataResponse)
                $scope.userSelectedClass.basicDetails = dataResponse.responseData.data[0];
                appUtils.showSuccess("User "+$scope.userSelectedClass.basicDetails.userName+" deleted successfully");
                $('#modalUpdate').modal('hide');
                $scope.searchUser();
            });

        }).error(function(data, status, headers, config) {
            // error
            console.log("Error", data, status,headers, config);

        });
     };
    
    $scope.openFileBrowser=function(){
        $('#imageUploader').click();
    }
    
	/*
    * Dropdown JSON data of getCountryStateCity
    */ 
    $http.get('/manageLibrary/getCountryStateCity').success(function(dataResponse,status,headers,config){
        //success
        console.log("getCountryStateCity",dataResponse);
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
         console.log("getuserType",dataResponse);
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
        console.log("ReligionCaste",dataResponse);
        appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            $scope.religionCaste=dataResponse;
         console.log("$scope.ReligionCaste",$scope.ReligionCaste);
        });

    }).error(function(data,status,headers,config){
        //error
        console.log("Error",data,status,headers,config);
    });

	/*
 	* Dropdown JSON data of Language
    */ 
    $http.get('/manageLibrary/getLanguages').success(function(dataResponse,status,headers,config){
        //success
        console.log("getLanguages",dataResponse);
        appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            $scope.languages=dataResponse;
         console.log("$scope.languages",$scope.languages);
        });

    }).error(function(data,status,headers,config){
        //error
        console.log("Error",data,status,headers,config);
    });
    
    /*
	 * Check availability of Registration ID 
	 */
	$scope.getregistrationIDAvailabity = function(){
		var regIdText = {regIdText: $scope.userSelectedClass.basicDetails.regID};
		console.log("getregistrationIDAvailabity ",regIdText);
		if(!angular.isUndefined(regIdText)){
            $http({
                method : 'POST',
                url : '/manage-users/users/registrationIDAvailabity',
                data : regIdText,
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).success(function(dataResponse, status, headers,config) {
                // success
                appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                    console.log("getregistrationIDAvailabity - dataResponse",dataResponse)
                    $scope.regIdAvailable = dataResponse.responseData.data;
                    console.log("responce data : ",dataResponse.responseData.data.length);
                });
            }).error(function(data, status, headers, config) {
                // error
                console.log("Error", data, status,headers, config);
            });
        }else
			appUtils.showError("Enter correct username");
		}
		 /*
		 * Check availability of username 
		 */
		$scope.getUserNameAvailabity = function(){
			var userText = {userText: $scope.userSelectedClass.basicDetails.userName};
			console.log("getUserNameAvailabity ",userText);
			if(!angular.isUndefined(userText))
				$http({
					method : 'POST',
					url : '/manage-users/users/userNameAvailablity',
					data : userText,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).success(function(dataResponse, status, headers,config) {
									// success
					appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
					console.log("getUserNameAvailabity - dataResponse",dataResponse)
					$scope.userAvailable = dataResponse.responseData.data;
//					console.log("responce data : ",dataResponse.responseData.data.length);
													});
								}).error(function(data, status, headers, config) {
									// error
									console.log("Error", data, status,headers, config);
								});
			else
				appUtils.showError("Enter correct username");
			}

    //image upload functionality
    $scope.readURL=function (input) {
        if (input.files	&& input.files[0]) {
            var file = input.files[0];
            if(!file){
                appUtils.showError("Please choose a .png  or .jpg or .jpeg file.");
                $(input).val("");
                return;
            }
            var fileName = file.name;
            if (file.name.indexOf("png") < 0  && file.name.indexOf("jpg") < 0 && file.name.indexOf("jepg") < 0) {
                $(input).val("");
                appUtils.showError("Please choose a .png  or .jpg or .jpeg file.");
                return;
            }
            if (file.size>100000) {
                $(input).val("");
                appUtils.showError("Please choose file of size less than 100KB.");
                return;
            }
            try{
                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.userSelectedClass.basicDetails.profileImagePath=e.target.result;
                    console.log("$scope.userClass.basicDetails.profileImagePath",$scope.userSelectedClass.basicDetails.profileImagePath);
                    $scope.$apply();
                }
                reader.readAsDataURL(file);
            }catch(e){
                var uploadImg = new FormData();
                uploadImg.append("imageFile", file);
                $http.post("/application/readImage", uploadImg, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(function(dataResponse, status, headers,config) {
                    // success
                    appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                        console.log("registerUser - dataResponse",dataResponse)
                        $scope.userSelectedClass.basicDetails.profileImagePath = dataResponse.responseData;
                        $scope.$apply();
                    });
                }).error(function(data, status, headers, config) {
                    // error
                    console.log("Error", data, status,headers, config);
                });
            }
        }
    }
    
    
    $scope.openModal=function(code){
        $scope.modalTitle="";
        $scope.modalCode=code || $scope.modalCode;
        $scope.buttonStyle='btn-primary';
        code && code=='add'?$scope.modalTitle="Add User":"";
        code && code=='update'?$scope.modalTitle="Update User":"";
        code && code=='delete'?$scope.modalTitle="Delete User":"";
        code && code=='view'?$scope.modalTitle="User Details":"";
        
        code && code=='delete'?$scope.buttonStyle="btn-danger":"btn-primary";

        $('#myTab li:first>a').click() //always open first tab
        $('#modalUpdate').modal({"backdrop": "static","show":true});
        $('#modalUpdate').modal({"show":false});
    }
    
    $scope.addUserOpenForm=function(){
        /* UserClass POJO Data Model */
//    	$scope.modalTitle="Add User";
        $http.get('/manage-users/userClassData').success(function(dataResponse, status, headers, config) {
            // success
            console.log("userClassData", dataResponse);
            appUtils.defaultParseResponse(dataResponse,function(dataResponse) {
                    $scope.userSelectedClone=appUtils.cloneJSObj(dataResponse.responseData);
                    $scope.userSelectedClass = dataResponse.responseData;   //User Class userClass.basicDetails.userName //way to access property
                    console.log("$scope.userClass", $scope.userSelectedClass);
                    $scope.openModal("add");
            });
        }).error(function(data, status, headers, config) {
            //error
            console.log("Error", data, status, headers, config);
        });
    }
    
    $scope.batchAddUser=function(){
        $('#csvUploader').click();
    }
    $scope.uploadCsv = function(thisObj) {
        appUtils.uploadCSV(thisObj,"/manage-users/uploadUserCSV",function(response){
            console.log("/manage-users/uploadUserCSV response",response)
        });
    };
    $scope.lovMapToArr=appUtils.lovMapToArr;
    
    /************************************************************
     *   Reset password for user from admin - Start             *
     ***********************************************************/
    $scope.resetMessage="";
    $scope.resetPasswordUser=""
    $scope.openResetPasswdModal=function(user){
    	console.log("openResetPasswdModal ",user);
    	$scope.resetPasswordUser=user;
    	$scope.resetMessage="Are you going to reset the password for user - "+user[0].userName+". Do you want to proceed. ";
    	 $('#resetPasswordModel').modal({"backdrop": "static","show":true});
         $('#resetPasswordModel').modal({"show":false});
    }
    
    $scope.doChange=function(){
//    	$('#resetPasswordModel').modal('hide'); /manage-users/saveUserSettings/
    	$http({
            method : 'POST',
            url    : '/manage-users/resetPassword/',
            data   : $scope.resetPasswordUser,
            headers: {'Content-Type': 'application/json'}
        }).success(function(dataResponse,status,headers,config){
            //success
            appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            	  console.log("checkExistingPassowrd: dataResponse : ",dataResponse);
            	  
            	  appUtils.showSuccess("Password for "+$scope.resetPasswordUser.userName+" updated successfully.");
            	  $('#resetPasswordModel').modal('hide'); 	
            	  
            });
        }).error(function(data,status,headers,config){
            //error
            console.log("Error",data,status,headers,config);
        });
    }

    $scope.gatBack=function(){
    	$('#resetPasswordModel').modal('hide'); 	
    }
    /************************************************************
     *   Reset password for user from admin - End               *
     ***********************************************************/
});