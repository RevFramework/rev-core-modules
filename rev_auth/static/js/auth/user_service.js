
app.service('UserService', function($rootScope, NotifyService) {
	
	var _isLoggedIn = false;
	
	this.isLoggedIn = function() {
		return _isLoggedIn;
	}
	
	this.doCredentialsLogin = function(email, password) {
		console.log(email, password);
		//_isLoggedIn = true;
		//$rootScope.$broadcast('userStateChanged');
	};

	this.doLogout = function() {
		_isLoggedIn = false;
		$rootScope.$broadcast('userStateChanged');
	};
});