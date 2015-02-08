
app.service('NotifyService', function(toaster) {
		
	this.info = function(message, title) {
		if (!title) title = "";
		toaster.pop('info', title, message)
	}
	
	this.success = function(message, title) {
		if (!title) title = "";
		toaster.pop('success', title, message)
	}

	this.error = function(message, title) {
		if (!title) title = "";
		toaster.pop('error', title, message)
	}
	
});