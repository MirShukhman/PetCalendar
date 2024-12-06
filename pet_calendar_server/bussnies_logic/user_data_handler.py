from log.logger import Logger
from authentication.token import Token
from authentication.authenticator import Authenticator
from db_handler.users import Users
from .pet_data_handler import PetDataHandler

logger = Logger()

class UserDataHandler:
    def __init__(self):
        self.token = Token()
        self.authenticator = Authenticator()
        self.pets = PetDataHandler()
        
    def edit_uder_data(self, token, new_email, new_phone, new_nickname):
        '''
        06.12.24
        Mir
        Input: token, new_email, new_phone, new_nickname (all str)
        Output: True + True / False + dict of {'type_err':'err'}
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            existining_user = Users.get_obj_by_filter({'email': new_email, 'phone': new_phone})
            if existining_user and existining_user[0].get('_id') != user_id:
                output = 'user with credentials exists'
                return False, {'user_err': output}
            
            update = Users.update(user_id, {'email': new_email, 'phone': new_phone, 'nickname': new_nickname})
            if update:
                output = True
                return True, True
                
            else:
                output = 'internal_err'
                return False, {'internal_err': output}
            
        except Exception as e:
            output = str(e)
            return False, {'internal_err': output}
            
        finally:
            logger.log('UserDataHandler','edit_uder_data',(token, new_email, new_phone, new_nickname), output)
            
    
    
    def delete_user(self, token):
        '''
        06.12.24
        Mir
        Delets user + all user's pets
        Input: token (str)
        Output: True / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            delete = Users.delete_obj(user_id)
            delete_pets = self.pets.delete_all_users_pets(token)
            output = True if delete and delete_pets else False
            return output
            
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('UserDataHandler','delete_user',token, output)
            