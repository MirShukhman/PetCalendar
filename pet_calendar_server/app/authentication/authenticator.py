
import jwt
from app import create_app
from log.logger import Logger
from db_handler.users import Users

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
            decoded_data = self._decode_token(token)
            if decoded_data:
                user_id = decoded_data['user_id']
                user_exists = Users.get_obj_by_id(user_id)
                if user_exists:
                    output = user_id
                    return user_id
            
            else:
                output = False
                return False
            
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log('Authenticator','authenticate_client', token, output)
            
            
    def _decode_token(self, token):
        """
        04.12.24
        Mir
        Input: token as str    
        Output: decoded_data(dict) / False
        """
        try:
            secret_key = create_app().config['SECRET_KEY']
            decoded_data = jwt.decode(token, secret_key, algorithms=['HS256'])
            output = decoded_data
            return decoded_data
            
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log('Authenticator','_decode_token', token, output)