
educationMediaApp.controller('processDetails', function ($scope, $http,$state, $location, $filter, $timeout, $stateParams, iconClassMapping,appUtils) {
	
	$scope.$state = $state;
	$scope.schoolId = $stateParams.schoolId;
	$scope.searchModel='';
	console.log("@@@@@ ::::: processDetails ::::: @@@@@",$scope.schoolId,"\n $stateParams",$stateParams);
	
	$scope.text = 'processDetails';	
  	
    $scope.loadSmy=function(){
    	console.log("@@@@@ ::::: loadSmy ::::: @@@@@");
    }
      
    function getSelectedSchool(){
		var schoolIdJson = {'schoolId':$scope.schoolId};
		
		 $http({
	          method : 'POST',
	          url    : '/getSelectedSchoolDetails',
	          data   : schoolIdJson,
	          headers: {'Content-Type': 'application/json'}
   	  }).success(function(dataResponse,status,headers,config){
	          //success
	          appUtils.defaultParseResponse(dataResponse,function(dataResponse){
	              console.log("getSelectedSchoolDetails dataResponse",dataResponse.responseData.data);
	              
	              });
	      }).error(function(data,status,headers,config){
	          //error
	          console.log("Error",data,status,headers,config);
	      });
	}
    
});
