
app.run(function(FormsService, $interpolate) {
	
	/* Form layout types:
	 *  - stacked (basic) - default
	 *  - horizontal
	 *  - inline
	 */
	
	function wrapInputTemplate(formOptions, fieldInputTemplate) {
		// Generate field label and surrounding DIVs for the specified form layout
		if (formOptions && formOptions.layout == 'horizontal') {
			return 	'<div class="form-group">' +
			    	'<label for="{{fieldName}}" class="col-sm-3 control-label">{{fieldMeta.label}}</label>' +
			    	'<div class="col-sm-9">' +
			    	fieldInputTemplate +
			    	'</div></div>';
		}
		else {
			return	'<div class="form-group">' +
		    		'<label for="{{fieldName}}">{{fieldMeta.label}}</label>' +
		    		fieldInputTemplate +
		    		'</div>';
		}
	}
	
	FormsService.registerFieldTypeHandler('TextField', {
		generateTemplate: function(modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<input type="text" name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"'
			if (fieldMeta.placeholder) inputTemplate += ' placeholder="{{fieldMeta.placeholder}}"'
			inputTemplate += '/>';
			return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
				modelName: modelName,
				fieldName: fieldName,
				fieldMeta: fieldMeta
	    	});
		}
	});

	FormsService.registerFieldTypeHandler('PasswordField', {
		generateTemplate: function(modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<input type="password" name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"'
			if (fieldMeta.placeholder) inputTemplate += ' placeholder="{{fieldMeta.placeholder}}"'
			inputTemplate += '/>';
			return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
				modelName: modelName,
				fieldName: fieldName,
				fieldMeta: fieldMeta
	    	});
		}
	});

	FormsService.registerFieldTypeHandler('MultilineTextField', {
		generateTemplate: function(modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<textarea name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"></textarea>'
			return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
				modelName: modelName,
				fieldName: fieldName,
				fieldMeta: fieldMeta
	    	});
		}
	});

});
