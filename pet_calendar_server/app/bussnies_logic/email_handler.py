import os
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from jinja2 import Environment, FileSystemLoader
from validate_email_address import validate_email
from log.logger import Logger

logger = Logger()

class EmailHandler:
    def __init__(self):
        load_dotenv()
        self.email_sender = 'miriamsh888@gmail.com'
        self.email_password = os.environ.get('EMAIL_PASSWORD')
    
    def _check_if_email_valid(self, email):
        return validate_email(email, check_mx=False)

    def _send_email(self,email_receiver,subject,message):
        '''
        04.12.24
        Mir
        Input: email_receiver (str), subject (str) ,message (html)
        Output: True / False
        '''
        try:
            valid_email = self._check_if_email_valid(email_receiver)
            if valid_email:
                # Create message
                html_message = message
                msg = MIMEMultipart()
                msg['From'] = self.email_sender
                msg['To'] = email_receiver
                msg['Subject'] = f'{subject}'
                msg.attach(MIMEText(html_message, 'html'))
                
                # Send email
                with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                    smtp.login(self.email_sender, self.email_password)
                    smtp.send_message(msg)
                
                output = True
                return True
            
            else:
                output = False
                return False
                
        except Exception as e:
            output=str(e)
            return False
            
        finally:
            logger.log('EmailHandler','_send_email',(email_receiver,subject),output)     
    

    def _create_verification_message(self,verification_code):
        '''
        04.12.24
        Mir
        Creates html for _send_email (specific for verification email). 
        Loads venv, renders 'verify_code_tepmlate.html' templeate with the code (param) provided. 
        Input: verification_code (int)
        Output: html / False
        '''
        try:
            # Create environment and load the template
            env = Environment(loader=FileSystemLoader('templates'))
            template = env.get_template('verify_code_tepmlate.html')

            # Render the template with the provided param
            rendered_content = template.render(code=verification_code)
            output=True
            return rendered_content
        
        except Exception as e:
            output=str(e)
            return False
            
        finally:
            logger.log('EmailHandler','_create_verification_message',verification_code,output)
    
    
    def send_verification_email(self, email_receiver, verification_code):
        '''
        04.12.24
        Mir
        Input: email_receiver (str), verification_code (int)
        Output: True / False
        '''
        try:
            message= self._create_verification_message(verification_code)
            send_email=self._send_email(email_receiver,'Your Verification Code',message)
            output = send_email
            return send_email
            
        except Exception as e:
            output=str(e)
            return False
            
        finally:
            logger.log('EmailHandler','send_verification_email',(email_receiver,verification_code),output)  