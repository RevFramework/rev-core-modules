
var app = angular.module('revapp', ['ui.bootstrap', 'ui.router', 'toaster']);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "view/rev_app/app_home_page"
	})
	.state('state1.list', {
		url: "/list",
		templateUrl: "partials/state1.list.html",
		controller: function($scope) {
			$scope.items = ["A", "List", "Of", "Items"];
		}
	});
});