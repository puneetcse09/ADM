
educationMediaApp.controller('welcomeHome', function ($scope, $http,$state,$stateParams,iconClassMapping,appUtils) {
	
	$scope.searchModel='';
	
	$scope.text = 'TEST';
     
  	
      $scope.homeSearch=function(){
    	  console.log("homeSearch");
//    	  $scope.loadSmy();
    	  $state.go('welcomeHome.homeSummary');
     }
      
      
      $scope.loadSmy=function(){
    	  console.log("loadSmy");
    	  $http({
	          method : 'POST',
	          url    : '/getSrchResults',
	          data   : $scope.searchModel,
	          headers: {'Content-Type': 'application/json'}
    	  }).success(function(dataResponse,status,headers,config){
	          //success
	          appUtils.defaultParseResponse(dataResponse,function(dataResponse){
	              console.log("getSrchResults dataResponse",dataResponse.responseData.data);
	              $scope.searchResult=dataResponse.responseData.data;
	              console.log("getSrchResults dataResponse",dataResponse.responseData.data.length,  $scope.searchResult);
	              
//	              if($scope.searchResult.length > 0){
//	            	  $state.go('welcomeHome.homeSummary');
//	              }
//	              $scope.allUserClass=dataResponse.responseData;
	          });
	      }).error(function(data,status,headers,config){
	          //error
	          console.log("Error",data,status,headers,config);
	      });

   	  
//    	  $state.go('welcomeHome.homeSummary');

      }
      
      $scope.processDetails=function(school){
    	  console.log("processDetails");
//    	  $scope.loadSmy();
    	  $state.go('welcomeHome.processDetails', { schoolId: school.schoolId});
     }
      
      
});
