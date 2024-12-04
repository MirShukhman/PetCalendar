
import jwt
from datetime import datetime
from app import create_app
from log.logger import Logger
from db_handler.users import Users

logger = Logger()

class Token:
    def __init__(self):
        pass
    
    def generate_token(self, user_id):
        """
        04.12.24
        Mir
        Generate token and save in db, Users collection token field.
        Input: user_id (str)
        Output: token (str) / False
        """
        try:
            now = datetime.now()
            token = jwt.encode(
                {'user_id': user_id,
                'created': now},
                create_app().config['SECRET_KEY'],
                algorithm='HS256'
            )
            
            save_token = Users.update(user_id,{'token':str(token)})
            if save_token:
                output = token
                return token
            
            else:
                output = False
                return False
            
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log('Token','generate_token',user_id,output)
            
            
    def get_token(self, user_id):
        """
        04.12.24
        Mir
        Input: user_id (str)
        Output: token (str) / None
        """
        try:
            seek = Users.get_fields_by_id(user_id,['token'])
            if seek:
                token = seek['token']
                output = token
                return token
            
            output = None  
            return None
            
        except Exception as e:
            output = str(e)
            return None
        
        finally:
            logger.log('Token','get_token',user_id,output)
    
    
    def delete_token(self, user_id):
        """
        04.12.24
        Mir
        Input: user_id (str)
        Output: True / False
        """
        try:
            delete = Users.delete_fields(user_id,['token'])
            output = True if delete else False
            return output
            
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log('LoginToken','delete_token',user_id,output)