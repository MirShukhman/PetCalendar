
import jwt
from app import create_app
from log.logger import Logger

logger = Logger()

class Authenticator:
    def __init__(self):
        pass
        
    def authenticate_client(self, token):
        """
        04.12.24
        Mir
        Input: token as str    
        Output: user_id (str) / False
        """
        try:
            secret_key = create_app().config['SECRET_KEY']
            decoded_data = jwt.decode(token, secret_key, algorithms=['HS256'])
            user_id = decoded_data.get('user_id', None)
            output = user_id
            return user_id
            
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log('Authenticator','authenticate_client', token, output)