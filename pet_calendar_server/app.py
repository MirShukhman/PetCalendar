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
        from bussnies_logic.user_data_handler import UserDataHandler
        from bussnies_logic.pet_data_handler import PetDataHandler
        user = UserDataHandler()
        login = LoginHandler()
        pets = PetDataHandler()
        l = pets.delete_pet('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MDY1MGFjMjBmY2U4N2Y0NzIxZDU3IiwiY3JlYXRlZCI6IjIwMjQtMTItMDZUMTk6NDM6MzUuMDMxMjUzIn0.Ui10dx6zXisnWUhz4Ywyisc2PlGGfw4AZpxUXXrzTYI',
                      '675344cbdc4fcc2955656898')
        #l = pets.add_pet('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MDY1MGFjMjBmY2U4N2Y0NzIxZDU3IiwiY3JlYXRlZCI6IjIwMjQtMTItMDZUMTk6NDM6MzUuMDMxMjUzIn0.Ui10dx6zXisnWUhz4Ywyisc2PlGGfw4AZpxUXXrzTYI',
        #                {'name':'gogo'})
        print(l)
        #token = login.confirm_login('miriamsh888@gmail.com','0542565362','697868')
        
    app.run(debug=app.config['DEBUG'], use_reloader=app.config['USE_RELOADER'], port=5000, host='0.0.0.0')
    