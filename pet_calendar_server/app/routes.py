from flask import Blueprint, request, jsonify
from bussnies_logic.login_handler import LoginHandler
from bussnies_logic.user_data_handler import UserDataHandler
from bussnies_logic.pet_data_handler import PetDataHandler
from log.logger import Logger

logger = Logger()

class Routes(Blueprint):
    def __init__(self, name, import_name):
        super().__init__(name, import_name)
        self.login_handler = LoginHandler()
        self.user_handler = UserDataHandler()
        self.pet_handler = PetDataHandler()
        
        self.route('/login', methods=['POST'])(self.login)
        self.route('/signup', methods=['POST'])(self.signup)
        self.route('/confirm_login', methods=['POST'])(self.confirm_login)
        self.route('/logout', methods=['DELETE'])(self.logout)
        
        self.route('/edit_uder_data', methods=['PUT'])(self.edit_uder_data)
        self.route('/delete_user', methods=['DELETE'])(self.delete_user)
        
        self.route('/restore_pet_data', methods=['GET'])(self.restore_pet_data)
        self.route('/add_pet', methods=['POST'])(self.add_pet)
        self.route('/update_pet/<string:pet_id>', methods=['PUT'])(self.update_pet)
        self.route('/delete_pet/<string:pet_id>', methods=['DELETE'])(self.delete_pet)
        
        
    def login(self):
        '''
        10.12.24
        Mir
        Input: 
            Header: None
            Body: json, 
                    {"email":"email_str",
                    "phone": "phone_str"}
        Output: json, {'login':True} + 201 / {'err_type': 'err_msg'} + 400/401/500
        '''
        try:
            data = request.json
            if not data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            email = data.get('email')
            phone = data.get('phone')

            if not email or not phone:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            login, err , type_err = self.login_handler.login(email,phone)
            
            if login:
                output = True
                return jsonify({'login': True}), 200
            elif err:
                output = err
                return jsonify(err), type_err
            else:
                output = {'internal_err': 'Unknown error occurred during login'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','login',data if data else 'no data',output)
        
        
    def signup(self):
        '''
        10.12.24
        Mir
        Input: 
            Header: None
            Body: json, 
                    {"email":"email_str",
                    "phone": "phone_str",
                    "nickname": "nickname"}
        Output: json, {'signup':True} + 201 / {'err_type': 'err_msg'} + 400/401/500
        '''
        try:
            data = request.json
            if not data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            email = data.get('email')
            phone = data.get('phone')
            nickname = data.get('nickname')

            if not email or not phone or not nickname:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            signup, err, type_err = self.login_handler.sign_up(email,phone,nickname)
            
            if signup:
                output = True
                return jsonify({'signup': True}), 201
            elif err:
                output = err
                return jsonify(err), type_err
            else:
                output = {'internal_err': 'Unknown error occurred during signup'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','signup',data if data else 'no data',output)
            
            
    def confirm_login(self):
        '''
        10.12.24
        Mir
        Input: 
            Header: None
            Body: json, 
                    {"email":"email_str",
                    "phone": "phone_str",
                    "code": "code_str"}
        Output: json, {'token':'token_str'} + 201 / {'err_type': 'err_msg'} + 400/401/500
        '''
        try:
            data = request.json
            if not data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            email = data.get('email')
            phone = data.get('phone')
            code = data.get('code')

            if not email or not phone:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            confirm_login, err, type_err = self.login_handler.confirm_login(email,phone,code)
            
            if confirm_login:
                output = True
                return jsonify(confirm_login), 201
            elif err:
                output = err
                return jsonify(err), type_err
            else:
                output = {'internal_err': 'Unknown error occurred during confirm_login'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','confirm_login',data if data else 'no data',output)
            
            
    def logout(self):
        '''
        10.12.24
        Mir
        Input: 
            Header: json, {"Authorization" : "token_str}
            Body: None
        Output: json, {'logout':True} + 200 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            if not token:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            logout = self.login_handler.logout(token)
            
            if logout:
                output = True
                return jsonify({'logout':True}), 200
            else:
                output = {'internal_err': 'Unknown error occurred during logout'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','logout',token if token else 'no data',output)
            
            
    def edit_uder_data(self):
        '''
        13.12.24
        Mir
        Input: 
            Header: json, {"Authorization" : "token_str}
            Body: json, 
                    {"email":"email_str",
                    "phone": "phone_str",
                    "nickname": "nickname"}
        Output: json, {'edit_user':True} + 201 / {'err_type': 'err_msg'} + 400/500/403
        '''
        try:
            token = request.headers.get('Authorization')
            data = request.json
            if not token or not data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            email = data.get('email')
            phone = data.get('phone')
            nickname = data.get('nickname')
            
            if not email or not phone or not nickname:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            edit_user, err , type_err = self.user_handler.edit_uder_data(token,email,phone,nickname)
            
            if edit_user:
                output = True
                return jsonify({'edit_user':True}), 201
            elif err:
                output = err
                return jsonify(err), type_err
            else:
                output = {'internal_err': 'Unknown error occurred during confirm_login'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','edit_uder_data',(token, data if token and data else 'no data'),output)
            
            
    def delete_user(self):
        '''
        13.12.24
        Mir
        Input: 
            Header: json, {"Authorization" : "token_str}
            Body: None
        Output: json, {'delete_user':True} + 200 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            if not token:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400

            delete_user = self.user_handler.delete_user(token)
            
            if delete_user:
                output = True
                return jsonify({'delete_user':True}), 200
            else:
                output = {'internal_err': 'Unknown error occurred during delete_user'}
                return jsonify(output), 500

        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','delete_user',token if token else 'no data',output)
            
            
    def restore_pet_data(self):
        '''
        13.12.24
        Mir
        Input: 
            Header: json, {"Authorization" : "token_str}
            Body: None
        Output: json, {'pet_data':[list, empty or dicts]} + 200 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            if not token:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            pet_data = self.pet_handler.pull_all_pets_data(token)
            if isinstance(pet_data, list):
                output = pet_data
                return jsonify({'pet_data': pet_data}), 200
            else:
                output = {'internal_err': 'Unknown error occurred'}
                return jsonify(output), 500
            
        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','restore_pet_data',token if token else 'no data',output)
            
            
    def add_pet(self):
        '''
        13.12.24
        Mir
        Input: 
            Header: json, {"Authorization" : "token_str}
            Body: json, 
                    {"pet_data":{dict of pet data}}
        Output: json, {'new_pet_id':'new_pet_id_str'} + 201 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            data = request.json
            if not token or not data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            pet_data = data.get('pet_data')
            if not pet_data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            new_pet = self.pet_handler.add_pet(token,pet_data)
            output = new_pet
            if new_pet:
                return jsonify({'new_pet_id': new_pet}), 201
            else:
                return jsonify({'internal_err': 'Unknown error occurred'}), 500
        
        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','add_pet',(token, data if token and data else 'no data'),output)
            

    def update_pet(self, pet_id):
        '''
        13.12.24
        Mir
        Input: 
            Route Param: string, pet_id
            Header: json, {"Authorization" : "token_str}
            Body: json, 
                    {"pet_data":{dict of pet data}}
        Output: json, {'update':True} + 201 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            data = request.json
            if not token or not data or not pet_id:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            pet_data = data.get('pet_data')
            if not pet_data:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            update = self.pet_handler.update_pet(token,pet_id,pet_data)
            output = update
            if update:
                return jsonify({'update': True}), 201
            else:
                return jsonify({'internal_err': 'Unknown error occurred'}), 500
            
        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','update_pet',(token, data,pet_id if token and data and pet_id else 'no data'),output)
            
            
    def delete_pet(self, pet_id):
        '''
        13.12.24
        Mir
        Input: 
            Route Param: string, pet_id
            Header: json, {"Authorization" : "token_str}
            Body: None
        Output: json, {'delete':True} + 200 / {'err_type': 'err_msg'} + 400/500
        '''
        try:
            token = request.headers.get('Authorization')
            if not token  or not pet_id:
                output = {'user_err': 'Incomplete or no data provided'}
                return jsonify(output), 400
            
            delete = self.pet_handler.delete_pet(token,pet_id)
            output = delete
            if delete:
                return jsonify({'delete': True}), 200
            else:
                return jsonify({'internal_err': 'Unknown error occurred'}), 500
            
        except Exception as e:
            output = str(e)
            return jsonify({'internal_err':str(e)}), 500
        
        finally:
            logger.log('Routes','delete_pet',(token, pet_id if token and pet_id else 'no data'),output)
            

            