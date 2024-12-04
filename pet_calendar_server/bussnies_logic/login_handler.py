from log.logger import Logger
from authentication.token import Token
from db_handler.users import Users
from .email_handler import EmailHandler
import random

logger = Logger()

class LoginHandler:
    def __init__(self):
        self.email = EmailHandler()
    
    def _generate_random_code(self):
        return random.randint(100000, 999999)


    def sign_up(self, email, phone, nickname):
        '''
        04.12.24
        Mir
        Checks that user with credentials dosent exist, creates code, emails code, creates user in db with the email_code field.
        Input: email, phone, nickname (all str)
        Otput: True / dict of {'type_err':'err'}
        '''
        try:
            existining_user = Users.get_obj_by_filter({'email': email, 'phone': phone})
            if existining_user:
                output = 'user with credentials exists'
                return {'user_err': output}
            
            code = self._generate_random_code()
            send_email = self.email.send_verification_email(email,code)
            if send_email:
                create_user = Users.add({'email': email, 'phone': phone, 'nickname': nickname, 'email_code': code})
                if create_user:
                    output = True
                    return True
                
                else:
                    output = 'internal_err'
                    return {'internal_err': output}
            
            else:
                output = 'invalid email adress'
                return {'user_err': output}

            
        except Exception as e:
            output = str(e)
            return {'internal_err': output}
            
        finally:
            logger.log('LoginHandler','sign_up',(email, phone, nickname), output)
    
    
    def login(self, email, phone):
        # seek user in db by email + phone 
        # if found, generate code 
        # save code in db Users collection 
        # send mail with code 
        try:
            existining_user = Users.get_obj_by_filter({'email': email, 'phone': phone})
            if existining_user:
                code = self._generate_random_code()
                send_email = self.email.send_verification_email(email,code)
                if send_email:
                    user_id = existining_user['_id']
                    save_code = Users.update(user_id,{'email_code',code})
                
                
            else:
                output = 'invalid credantials'
                return {'user_err': output}
             
        except Exception as e:
            output = str(e)
            return {'internal_err': output}
            
        finally:
            logger.log('LoginHandler','login',(email, phone), output)
        
    def confirm_login(self, email, phone, code):
        pass
        # seek user in db by email + phone 
        # get code from db 
        # cofirm code 
        # seek token
        #   if found, return token 
        # if no token, generate token
        # save token in db
        # return token
        
        
    def logout(self, token):
        pass
        # delete token fron db 