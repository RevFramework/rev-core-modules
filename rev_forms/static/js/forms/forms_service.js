
app.service("FormsService", function() {
	
	this.field_type_handlers = {}; // Dictionary of field type handlers
	
	this.registerFieldTypeHandler = function(fieldTypeName, fieldTypeHandler) {
		/*
		 * fieldTypeName name as used in a model's _fields 'field_type' property
		 * 
		 * fieldTypeHandler should be an object with the following keys:
		 * 
		 * templateGenerator: function that takes a field definition and generates appropriate template HTML
		 */
		
		this.field_type_handlers[fieldTypeName] = fieldTypeHandler;
	};
	
	this.getFieldTypeHandler = function(fieldTypeName) {
		if (fieldTypeName in this.field_type_handlers) {
			return this.field_type_handlers[fieldTypeName];
		}
		else {
			return null;
		}
	};
	
});