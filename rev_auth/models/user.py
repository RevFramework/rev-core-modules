
from rev.db import Model, fields
from rev.i18n import translate as _

class User(Model):

    _description = 'User'
    
    id = fields.RecordIDField(_('User ID'))
    username = fields.TextField(_('Login Name'))
    email = fields.EmailAddressField(_('E-mail Address'))
    password = fields.PasswordField(_('Password'))

    _unique = ['name']