from log.logger import Logger
from authentication.token import Token
from authentication.authenticator import Authenticator
from db_handler.users import Users
from .email_handler import EmailHandler
import random

logger = Logger()

class LoginHandler:
    def __init__(self):
        self.email = EmailHandler()
        self.token = Token()
        self.authenticator = Authenticator()
    
    def _generate_random_code(self):
        return random.randint(100000, 999999)


    def sign_up(self, email, phone, nickname):
        '''
        04.12.24
        Mir
        Checks that user with credentials dosent exist, creates code, emails code, creates user in db with the email_code field.
        Input: email, phone, nickname (all str)
        Otput: True + True / False + dict of {'type_err':'err'}
        '''
        try:
            existining_user = Users.get_obj_by_filter({'email': email, 'phone': phone})
            if existining_user:
                output = 'user with credentials exists'
                return False, {'user_err': output}, 400
            
            code = self._generate_random_code()
            send_email = self.email.send_verification_email(email,code)
            if send_email:
                create_user = Users.add({'email': email, 'phone': phone, 'nickname': nickname, 'email_code': code})
                if create_user:
                    output = True
                    return True, True, None
                
                else:
                    output = 'internal_err'
                    return False, {'internal_err': output}, 500
            
            else:
                output = 'invalid email adress'
                return False, {'user_err': output}, 401

            
        except Exception as e:
            output = str(e)
            return False, {'internal_err': output}, 500
            
        finally:
            logger.log('LoginHandler','sign_up',(email, phone, nickname), output)
    
    
    def login(self, email, phone):
        '''
        04.12.24
        Mir
        Finds user in db by email+phone, sends code by email, saves code in db.
        Input: email, phone (all str)
        Otput: True + True / False + dict of {'type_err':'err'}
        '''
        try:
            existining_user = Users.get_obj_by_filter({'email': email, 'phone': phone})
            if existining_user:
                code = self._generate_random_code()
                send_email = self.email.send_verification_email(email,code)
                if send_email:
                    user_id = existining_user[0].get('_id')
                    save_code = Users.update(user_id,{'email_code': code})
                    if save_code:
                        output = True
                        return True, True, None
                
                    else:
                        output = 'internal_err'
                        return False, {'internal_err': output}, 500
                         
            else:
                output = 'invalid credantials'
                return False, {'user_err': output}, 401
             
        except Exception as e:
            output = str(e)
            return False, {'internal_err': output}, 500
            
        finally:
            logger.log('LoginHandler','login',(email, phone), output)
        
        
    def confirm_login(self, email, phone, code):
        '''
        05.12.24
        Mir
        Finds user in db by email+phone, compares db code to given code, 
        checks if token exists, if yes returns existing token, if not generates token
        and returns it. 
        Input: email, phone, code (all str)
        Otput: True + dict of {'token':'token'} / False + dict of {'type_err':'err'}
        '''
        try:
            existining_user = Users.get_obj_by_filter({'email': email, 'phone': phone})
            if existining_user:
                db_code = str(existining_user[0]['email_code'])
                user_id = existining_user[0]['_id']
                if db_code == code:
                    if existining_user[0].get('token'):
                        delete_code = Users.delete_fields(user_id, ['email_code'])
                        output = True
                        return True, {'token':existining_user[0]['token']}, None
                    
                    else:
                        user_id = existining_user[0]['_id']
                        token = self.token.generate_token(user_id)
                        
                        if token:
                            delete_code = Users.delete_fields(user_id, ['email_code'])
                            output = True
                            return True, {'token':token}, None
                        
                        else:
                            output = 'internal_err'
                            return False, {'internal_err': output}, 500
                            
                else:
                    output = 'wrong verification code'
                    return False, {'user_err': output}, 401
                
            else:
                output = 'invalid credantials'
                return False, {'user_err': output}, 401
             
        except Exception as e:
            output = str(e)
            return False, {'internal_err': output}, 500
            
        finally:
            logger.log('LoginHandler','confirm_login',(email, phone), output)
                
        
        
    def logout(self, token):
        '''
        05.12.24
        Mir
        Deletes token from db.
        Input: token (str)
        Otput: True / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            if user_id:
                logout = self.token.delete_token(user_id)
                output = True if logout else False
                return output
                
            else:
                output = False
                return False
            
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('LoginHandler','logout',token, output)