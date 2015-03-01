
from flask import render_template

class FormWidget():
    def render(self, app, form_attrs, field_attrs):
        widget_source = render_template('form_widgets/{}.j2'.format(self.__class__.__name__),
                                form_attrs=form_attrs,
                                field_attrs=field_attrs)
        return widget_source

class TextField(FormWidget):
    pass

class EmailAddressField(FormWidget):
    pass

class PhoneNumberField(FormWidget):
    pass

class URLField(FormWidget):
    pass

class PasswordField(FormWidget):
    pass

class MultilineTextField(FormWidget):
    pass

class SelectionField(FormWidget):
    pass

class MultiSelectionField(FormWidget):
    pass

class IntegerField(FormWidget):
    pass

class FloatField(FormWidget):
    pass

class DecimalField(FormWidget):
    pass

class BooleanField(FormWidget):
    pass

class DateField(FormWidget):
    pass

class DateTimeField(FormWidget):
    pass

class RecordLinkField(FormWidget):
    pass
