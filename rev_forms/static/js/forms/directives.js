
/* FORM tag directives */

app.directive('formModel', function(FormsService, $compile, $log) {
	return {
		restrict: 'A',
		require: 'form',
		controller: function($attrs) {
			this.model = $attrs.formModel;
		},
		compile: function(element, attrs) {
			element.attr('novalidate', 'novalidate');
		}
	}
});

app.directive('formOptions', function(FormsService, $compile, $log) {
	return {
		restrict: 'A',
		require: 'form',
		controller: function($scope, $attrs) {
			this.options = angular.copy($scope.$eval($attrs.formOptions));
		},
		link: function(scope, element, attrs) {
			var opts = scope.$eval(attrs.formOptions);
			if (opts && opts.layout) {
				if (opts.layout == 'inline' || opts.layout == 'horizontal') {
					element.addClass('form-'+opts.layout);
				}
			}
			else opts = {};
			opts.form
		}
	}
});

/* FIELD tag */
	
app.directive('field', function(FormsService, $compile, $log) {
	
	return {
		restrict: 'E',
		replace: true,
		require: ['^form', '^formModel', '?^formOptions'],
		link: function(scope, element, attrs, controllers) {

			var errorPlaceholder = '<div class="alert alert-danger" role="alert"><strong>Field Error</strong> Check console for details.</div>';

			var formCtrl = controllers[0];
			var modelName = controllers[1].model;
			var fieldName = element.attr('name');
			var formOptions = controllers[2] ? controllers[2].options : null;
			
			if (!modelName || !fieldName) {
				$log.error("<field> tags must have 'name' and 'ng-model' attributes!");
				element.html(errorPlaceholder); return;
			}
			else if (!scope[modelName]._fields) {
				$log.error("Model specified for field '"+fieldName+"' has no _fields property!");
				element.html(errorPlaceholder); return;
			}
			else if (!(fieldName in scope[modelName]._fields)) {
				$log.error("Field '"+fieldName+"' does not exist in the specified model's _fields property!");
				element.html(errorPlaceholder); return;
			}
			else if (!('field_type' in scope[modelName]._fields[fieldName])) {
				$log.error("Field '"+fieldName+"' does not specify a field_type in the model's _fields property!");
				element.html(errorPlaceholder); return;
			}
			
			var fieldMeta = scope[modelName]._fields[fieldName];
			var fieldTypeHandler = FormsService.getFieldTypeHandler(fieldMeta.field_type);

			if (!fieldTypeHandler) {
				$log.error("No handler found for field type '"+fieldMeta.field_type+"'!");
				element.html(errorPlaceholder); return;
			}
			
			var field_html = fieldTypeHandler.generateTemplate(formCtrl, modelName, fieldName, fieldMeta, formOptions);
			element.replaceWith($compile(field_html)(scope));
		}
	};
});



/* to do:

COMMON ERRORS (for documentation)

"Error: [$compile:ctreq] Controller 'ngModel', required by directive 'field', can't be found!

make sure all <field> tags have an ng-model attribute

$scope.user = {
    _fields: {
        'username': {
            field_type: 'TextField',
            label: 'Username',
            required: true,
            minlength: 6
        }
        'password': {
            field_type: 'PasswordField',
            label: 'Password',
            required: true,
            minlength: 6
        }
    }
}

<field model="user" name="name" />

*/