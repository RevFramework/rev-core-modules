
from rev.db import Model, fields
from rev.i18n import translate as _

class User(Model):

    _description = 'User'
    
    id = fields.RecordIDField(_('User ID'))
    username = fields.TextField(_('Login'), minlength=6)
    email = fields.EmailAddressField(_('E-mail Address'))
    password = fields.PasswordField(_('Password'), minlength=6)

    remember_me = fields.BooleanField(_('Remember my e-mail address'), required=False, stored=False)

    _unique = ['name']