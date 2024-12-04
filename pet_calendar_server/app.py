from flask import Flask, jsonify
from db_handler import mongo

app = Flask(__name__)


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('.config')
    mongo.init_app(app)
    
    return app



if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        from db_handler.users import Users
        from authentication.token import Token
        user = Users.delete_fields('6747caa4a9d923b1c68cc8da', ['color'])
        print(user)
        
    app.run(debug=app.config['DEBUG'], use_reloader=app.config['USE_RELOADER'], port=5000, host='0.0.0.0')
    