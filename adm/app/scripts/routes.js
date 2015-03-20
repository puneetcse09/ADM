'use strict';
/*
 educationMediaApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
 $routeProvider
 .when("/", { redirectTo: "/manage-attendance/create-attendence" })
 .when("/manage-users/user-profile", {templateUrl: "partials/modules/manageUsers/userProfile", controller: "user_profile" })
 .when("/manage-users/users", {templateUrl: "partials/modules/manageUsers/manageUser", controller: "manage_user" })
 .when("/manage-org/create-org", {templateUrl: "partials/modules/manageOrg/createOrg", controller: "manageOrg_createOrg" })
 .when("/manage-attendance/create-attendence", {templateUrl: "partials/modules/manageAttendence/createAttendence", controller: "manageAttendence_createAttendence" })
 .otherwise({ redirectTo: "/" });
 }]);*/
educationMediaApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");
	//
	// Now set up the states
	
	$stateProvider
	.state('userProfile', {
		url : "/manage-users/user-profile",
		templateUrl : "partials/modules/manageUsers/userProfile.html",
		controller : 'user_profile',
		data : {
			displayName : 'User Profile'
		}
	})
	.state('welcomeHome', {
		url : "/home",
		templateUrl : "partials/modules/home/home.html",
		controller : 'welcomeHome',
		data : {
			displayName : 'Home'
		}
	})
	.state('welcomeHome.homeSummary', {
		url : "/searchResult",
		templateUrl : "partials/modules/home/homeSmy.html",
		controller : 'welcomeHome',
		data : {
			displayName : 'Home Summary'
		}
	})
	.state('welcomeHome.processDetails', {
		url : "/processDetails/:schoolId",
		templateUrl : "partials/modules/home/processDetails.html",
		controller : 'processDetails',
		data : {
			displayName : 'Process Details'
		}
	})
});
