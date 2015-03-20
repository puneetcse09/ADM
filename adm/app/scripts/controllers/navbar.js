'use strict';

angular.module('educationMediaApp')
  .controller('NavbarCtrl', function ($scope, $location,$http,appUtils) {
	  
	  /*
    $http.get('/getSchoolInfo').success(function(dataResponse,status,headers,config){
        //success
        console.log("dataResponse getSchoolInfo: ################# :",dataResponse);
        appUtils.defaultParseResponse(dataResponse,function(dataResponse){
            $scope.schoolDetails=dataResponse.responseData[0];
            $scope.firstName=dataResponse.responseData[1];
            $scope.lastName=dataResponse.responseData[2];
            $scope.userName=dataResponse.responseData[3];
        });

    }).error(function(data,status,headers,config){
        //error
        console.log("Error",data,status,headers,config);
    });
    $http.get('/getUserImage').success(function(dataResponse,status,headers,config){
        appUtils.defaultParseResponse(dataResponse,function(dataResponse){
           var image= dataResponse.responseData.image;
            console.log("image dataResponse",dataResponse);
            $scope.userImage=image;
        });
    });
    $scope.getOrgLogoPath=function(){
        if($scope.schoolDetails){
            var path="images/schoolLogo/"+$scope.schoolDetails.schoolId.replace(/:/g,"_")+".png";
            return path;
        }
    }
    */
    
    $scope.loginSubmit=function(){
    	console.log("@@@@@ ::::: loginSubmit ::::: @@@@@");
    }
  });
