
app.controller('UserMenuController', function($scope, UserService) {
	
	$scope.user = {
		'name' : 'Russell B'
	}
	
	function updateUserMenu() {
		$scope.isLoggedIn = UserService.isLoggedIn();
	}
	
	$scope.$on('userStateChanged', updateUserMenu);
});

app.controller('LoginFormController', function($scope, UserService) {
	
	$scope.loading = false;
	$scope.user = {};
	
	$scope.doLogin = function() {
		if ($scope.loginForm.$valid) {
			$scope.loading = true;
			UserService.doCredentialsLogin(
				$scope.user.email,
				$scope.user.password
			);
		}
	};
	
});

app.controller('LogoutController', function($scope, UserService) {
	UserService.doLogout();
});