
from flask.ext.classy import FlaskView, route

class RevModelHTTPController(FlaskView):
    route_base = '/'

    @route('/models/<model_name>/<method>')
    def execute_model(self, model_name, method):
        print('model_name =', model_name)
        print('method =', method)
        return "WOO!!!!!"
        