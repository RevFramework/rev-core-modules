
from flask import render_template, current_app, request, abort
from flask.ext.classy import FlaskView

class RevAppHTTPController(FlaskView):
    route_base = '/'

    def index(self):
        return render_template('index.html')
    
    def view(self, module, view_id):
        view = None
        if current_app.debug:
            # Recompile view every time
            view = current_app.registry.get('View').get_rendered_view(module, view_id)
        else:
            # Load view from cache if available
            view = current_app.cache.get('/view'+request.path)
            if not view:
                view = current_app.registry.get('View').get_rendered_view(module, view_id)
                if view:
                    current_app.cache.set('/view'+request.path, view)
                else:
                    current_app.cache.set('/view'+request.path, '404')
        if not view or view == '404':
            abort(404)
        return view
        