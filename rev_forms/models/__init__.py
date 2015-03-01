
FORM_WIDGETS = {}

def register_widget(widget_name, widget_class):
    global FORM_WIDGETS
    FORM_WIDGETS[widget_name] = widget_class

from .widgets import *

register_widget('TextField', TextField())
register_widget('EmailAddressField', EmailAddressField())
register_widget('PhoneNumberField', PhoneNumberField())
register_widget('URLField', URLField())
register_widget('PasswordField', PasswordField())
register_widget('MultilineTextField', MultilineTextField())
register_widget('SelectionField', SelectionField())
register_widget('MultiSelectionField', MultiSelectionField())
register_widget('IntegerField', IntegerField())
register_widget('FloatField', FloatField())
register_widget('DecimalField', DecimalField())
register_widget('BooleanField', BooleanField())
register_widget('DateField', DateField())
register_widget('DateTimeField', DateTimeField())
register_widget('RecordLinkField', RecordLinkField())
