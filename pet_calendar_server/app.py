from flask import Flask
from flask_cors import CORS
from db_handler import mongo

app = Flask(__name__)


def create_app():
    from routes import Routes
    app = Flask(__name__)
    app.config.from_pyfile('.config')
    mongo.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    routes_blueprint = Routes('routes', __name__)
    app.register_blueprint(routes_blueprint)
    
    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        from db_handler.users import Users
        from bussnies_logic.login_handler import LoginHandler
        from bussnies_logic.user_data_handler import UserDataHandler
        from bussnies_logic.pet_data_handler import PetDataHandler

        
    app.run(debug=app.config['DEBUG'], use_reloader=app.config['USE_RELOADER'], port=5000, host='0.0.0.0')
    