from rev.db import OverrideModel
from rev.db.exceptions import XMLImportError
from . import FORM_WIDGETS

from lxml import etree
from flask import render_template

FORM_LAYOUTS = ['stacked', 'inline', 'horizontal']

class View(OverrideModel):
    
    def view_post_process(self, view_xml_tree):

        class FieldPropertyResolver:
            # Simple dict-like object that resolves properties of fields
            # based on the XML definition and the field object
            def __init__(self, field_obj, field_attrs):
                self._obj = field_obj
                self._attrs = field_attrs
            def __contains__(self, key):
                if hasattr(self._obj, key) or key in self._attrs:
                    return True
            def __getitem__(self, key):
                if key in self._attrs:
                    return self._attrs[key]
                elif hasattr(self._obj, key):
                    return getattr(self._obj, key)
                else:
                    raise KeyError()
         
        # Locate form tags
        form_elements = view_xml_tree.xpath('//rev-form')
        for form in form_elements:
             
            # Process form attributes
            form_attrs = dict(form.attrib)

            if not 'model' in form_attrs or not 'var' in form_attrs:
                raise XMLImportError("<rev-form> must have at least 'model' and 'var' attributes.")

            if not self.registry.model_exists(form_attrs['model']):
                raise XMLImportError("<form> 'model' does not exist: {}".format(form_attrs['model']))
            form_attrs['name'] = form_attrs['var']+'_form'
             
            if 'layout' in form_attrs:
                if form_attrs['layout'] not in FORM_LAYOUTS:
                    raise XMLImportError("<form> layout '{}' is invalid. Valid options are: {}".format(form_attrs['layout'], ', '.join(FORM_LAYOUTS)))
            else:
                form_attrs['layout'] = 'stacked'

            # Transform the rev-form tag into a form tag with appropriate attributes
            form.tag = 'form'
            form.attrib['name'] = form_attrs['name']
            form.attrib['novalidate'] = 'novalidate'
            if form_attrs['layout'] != 'stacked':
                if 'class' not in form.attrib:
                    form.attrib['class'] = 'form-'+form_attrs['layout']
                else:
                    form.attrib['class'] += ' form-'+form_attrs['layout']
                 
            # Deal with <field> tags
            field_elements = form.xpath('//field')
            model_obj = self.registry.get(form_attrs['model'])
            for field in field_elements:
                 
                # Process field attributes
                field_attrs = dict(field.attrib)
                 
                if 'name' not in field_attrs:
                    raise XMLImportError("<field> 'name' attribute must be specified.")
 
                if field_attrs['name'] not in model_obj.fields:
                    raise XMLImportError("Field '{}' doe not exist in model '{}".format(field_attrs['name'], form_attrs['model']))
                 
                field_obj = model_obj.fields[field_attrs['name']]
                 
                if 'widget' not in field_attrs:
                    field_attrs['widget'] = field_obj.default_widget
                     
                if field_attrs['widget'] not in FORM_WIDGETS:
                    raise XMLImportError("Widget '{}' for field '{}' is not registered.".format(field_attrs['widget'], field_attrs['name']))
                 
                # Generate widget source
                widget_source = FORM_WIDGETS[field_attrs['widget']].render(
                                                             self.registry.app,
                                                             form_attrs,
                                                             FieldPropertyResolver(field_obj, field_attrs))
                try:
                    widget_xml = etree.fromstring(widget_source)
                except Exception as e:
                    raise XMLImportError("Error parsing widget '{}' for field '{}': {}".format(field_attrs['widget'], field_attrs['name'], e))
                
                # Substitute <field> tag with widget html
                field.getparent().replace(field, widget_xml)
                 
            # Deal with <fieldwrapper> tags
            wrapper_elements = form.xpath('//fieldwrapper')
            for wrapper in wrapper_elements:
                 
                # Process wrapper attributes
                wrapper_attrs = dict(wrapper.attrib)
                 
                # Generate wrapper source
                wrapper_source = render_template('form_widgets/FieldWrapper.j2',
                                                    form_attrs=form_attrs,
                                                    wrapper_attrs=wrapper_attrs)
                try:
                    wrapper_xml = etree.fromstring(wrapper_source)
                except Exception as e:
                    raise XMLImportError("Error parsing output of FieldWrapper.j2 template: {}".format(e))
                
                # Wrap the sub-elements of the fieldwrapper tag
                content_el = wrapper_xml.xpath('//wrappercontent')
                if len(content_el) != 1:
                    raise XMLImportError("FieldWrapper.j2 template must include exactly one <wrappercontent> tag")
                
                content_parent = content_el[0].getparent()
                content_idx = content_parent.index(content_el[0])
                content_parent.remove(content_el[0])
                new_index = content_idx
                for sub_el in wrapper:
                    content_parent.insert(new_index, sub_el)
                    new_index += 1
                
                # Replace the wrapper tag with the templated XML
                wrapper.getparent().replace(wrapper, wrapper_xml)
