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
        from bussnies_logic.login_handler import LoginHandler
        login = LoginHandler()
        signup = login.logout('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MDVlOTIwZjhhMmY0ODIwYzI5OWM0IiwiY3JlYXRlZCI6IjIwMjQtMTItMDZUMDI6MDU6MTguNzYyODc3In0.IE4-B6lGA3ypW1KSC2XUPn9STfnwsl6Enfw_wJK_JB0')
        print(signup)
        
    app.run(debug=app.config['DEBUG'], use_reloader=app.config['USE_RELOADER'], port=5000, host='0.0.0.0')
    