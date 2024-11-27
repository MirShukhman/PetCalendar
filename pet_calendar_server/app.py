from flask import Flask, jsonify
from db_handler import db

app = Flask(__name__)


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('.config')
    db.init_app(app)
    
    print("Flask app created with config:", app.config)
    
    return app



if __name__ == '__main__':
    app = create_app()
    app.run(debug=app.config['DEBUG'], use_reloader=app.config['USE_RELOADER'], port=5000, host='0.0.0.0')
    