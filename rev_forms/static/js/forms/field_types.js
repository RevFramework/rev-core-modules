
app.run(function(FormsService, $interpolate) {
	
	/* Form layout types:
	 *  - stacked (basic) - default
	 *  - horizontal
	 *  - inline
	 */
	
	function wrapInputTemplate(formOptions, fieldInputTemplate) {
		// Generate field label and surrounding DIVs for the specified form layout
		if (formOptions && formOptions.layout == 'horizontal') {
			return 	'<div class="form-group" ng-class="{\'has-error\': {{formName}}.{{fieldName}}.$invalid &amp;&amp; ({{formName}}.{{fieldName}}.$touched || {{formName}}.$submitted)}">' +
			    	'<label for="{{fieldName}}" class="col-sm-3 control-label">{{fieldMeta.label}}</label>' +
			    	'<div class="col-sm-9">' +
			    	fieldInputTemplate +
			    	'</div></div>';
		}
		else {
			return	'<div class="form-group" ng-class="{\'has-error\': {{formName}}.{{fieldName}}.$invalid &amp;&amp; ({{formName}}.{{fieldName}}.$touched || {{formName}}.$submitted)}">' +
		    		'<label for="{{fieldName}}">{{fieldMeta.label}}</label>' +
		    		fieldInputTemplate +
		    		'</div>';
		}
	}
	
	function getCommonAttributes(fieldMeta) {
		extraAttrs = '';
		if (fieldMeta.placeholder) extraAttrs += ' placeholder="{{fieldMeta.placeholder}}"'
		if (fieldMeta.required) extraAttrs += ' required'
		if (fieldMeta.minlength) extraAttrs += ' ng-minlength="{{fieldMeta.minlength}}"'
		if (fieldMeta.maxlength) extraAttrs += ' ng-maxlength="{{fieldMeta.maxlength}}"'
		return extraAttrs;
	}
	
	var errorsDivStart = '<div ng-show="{{formName}}.$submitted || {{formName}}.{{fieldName}}.$touched" style="margin-top:5px;">';
	var errorsDivEnd = '</div>';

	function getCommonErrors(fieldMeta) {
		errorsHtml = '';
		if (fieldMeta.required)
			errorsHtml += '<p class="text-danger" ng-show="{{formName}}.{{fieldName}}.$error.required">This field is required.</p>';
		if (fieldMeta.minlength)
			errorsHtml += '<p class="text-danger" ng-show="{{formName}}.{{fieldName}}.$error.minlength">Please enter at least {{fieldMeta.minlength}} characters.</p>';
		if (fieldMeta.maxlength)
			errorsHtml += '<p class="text-danger" ng-show="{{formName}}.{{fieldName}}.$error.maxlength">Maximum length is {{fieldMeta.maxlength}} characters.</p>';
		return errorsHtml;
	}
	
	FormsService.registerFieldTypeHandler('TextField', {
		generateTemplate: function(formCtrl, modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<input type="text" name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"'
			inputTemplate += getCommonAttributes(fieldMeta)
			inputTemplate += '/>';
			inputTemplate += errorsDivStart;
			inputTemplate += getCommonErrors(fieldMeta);
			inputTemplate += errorsDivEnd;
			return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
				modelName: modelName,
				fieldName: fieldName,
				fieldMeta: fieldMeta,
				formName: formCtrl.$name
	    	});
		}
	});

	FormsService.registerFieldTypeHandler('PasswordField', {
		generateTemplate: function(formCtrl, modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<input type="password" name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"'
				inputTemplate += getCommonAttributes(fieldMeta)
				inputTemplate += '/>';
				inputTemplate += errorsDivStart;
				inputTemplate += getCommonErrors(fieldMeta);
				inputTemplate += errorsDivEnd;
				return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
					modelName: modelName,
					fieldName: fieldName,
					fieldMeta: fieldMeta,
					formName: formCtrl.$name
		    	});
		}
	});

	FormsService.registerFieldTypeHandler('MultilineTextField', {
		generateTemplate: function(formCtrl, modelName, fieldName, fieldMeta, formOptions) {
			var inputTemplate = '<textarea name="{{fieldName}}" ng-model="{{modelName}}.{{fieldName}}" class="form-control"></textarea>'
			return $interpolate(wrapInputTemplate(formOptions, inputTemplate))({
				modelName: modelName,
				fieldName: fieldName,
				fieldMeta: fieldMeta
	    	});
		}
	});

});
