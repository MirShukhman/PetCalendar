from log.logger import Logger
from authentication.token import Token
from authentication.authenticator import Authenticator
from db_handler.pets import Pets
from db_handler.users import Users

logger = Logger()

class PetDataHandler:
    def __init__(self):
        self.token = Token()
        self.authenticator = Authenticator()
        
    def pull_all_pets_data(self, token):
        '''
        07.12.24
        Mir
        Pull all of user's pets' data - restore backup for frontend
        Input: token (str)
        Output: List of dicts / Empty List / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            if user_id:
                all_user_pets_ids = Users.get_fields_by_id(user_id,['pets'])
                if all_user_pets_ids:
                    all_user_pets_ids_list = all_user_pets_ids.get('pets')
                    users_pets_data = []
                    for pet in all_user_pets_ids_list:
                        pet_data = Pets.get_obj_by_id(pet)
                        users_pets_data.append(pet_data)
                    
                    output = users_pets_data
                    return users_pets_data  
                    
                else: 
                    output = []
                    return []
                
            else:
                output = False
                return False
        
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('PetDataHandler','pull_all_pets_data',token, output)
    
    
    def update_pet(self, token, pet_id, new_pet_data_dict):
        '''
        07.12.24
        Mir
        Input: token (str), pet_id (str), new_pet_data_dict (dict)
        Output: True / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            if user_id:
                pet = Pets.get_obj_by_id(pet_id)
                if pet.get('user_id') == user_id:
                    update_pet = Pets.update(pet_id, new_pet_data_dict)
                    output = True if update_pet else False
                    return output
                    
            else:
                output = False
                return False
        
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('PetDataHandler','update_pet',(token, pet_id, new_pet_data_dict), output)    
            

    def add_pet(self,token,pet_data_dict):
        '''
        06.12.24
        Mir
        Adds pet to Pets collection + to user's pets array field
        Input: token (str), pet_data_dict (dict)
        Output: new pet_id / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            pet_data_dict['user_id'] = user_id
            new_pet = Pets.add(pet_data_dict)
            if new_pet:
                existing_pets = Users.get_fields_by_id(user_id,['pets'])
                if existing_pets:
                    existing_pets_list  = existing_pets.get('pets')
                    existing_pets_list.insert(-1,new_pet)
                    updated_pet_list = existing_pets_list
                
                else:
                    updated_pet_list = [new_pet]
                
                update_user = Users.update(user_id,{'pets':updated_pet_list})
                output = new_pet if update_user else False
                return output
                
            else:
                output = False
                return False
    
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('PetDataHandler','add_pet',(token, pet_data_dict), output)
    
    
    def delete_pet(self, token, pet_id):
        '''
        06.12.24
        Mir
        Deletes pet from Pets collection + from user's pets array field
        Input: token (str), pet_id (str)
        Output: True / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            if user_id:
                pet = Pets.get_obj_by_id(pet_id)
                if pet.get('user_id') == user_id:
                    delete = Pets.delete_obj(pet_id)
                    if delete:
                        users_pets = Users.get_fields_by_id(user_id,['pets'])
                        existing_pets_list  = users_pets.get('pets')
                        updated_pet_list = [pet for pet in existing_pets_list if pet != pet_id]
                        update_user = Users.update(user_id,{'pets':updated_pet_list})
                        output = True if update_user else False
                        return output
                
            else:
                output = False
                return False
            
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('PetDataHandler','delete_pet',(token, pet_id), output)
            
            
    def delete_all_users_pets(self, token):
        '''
        06.12.24
        Mir
        Input: token (str)
        Output: True / False
        '''
        try:
            user_id = self.authenticator.authenticate_client(token)
            if user_id:
                pets = Pets.get_obj_by_filter({'user_id':user_id})
                flag = True
                for pet in pets:
                    pet_id = pet.get('_id')
                    delete = Pets.delete_obj(pet_id)
                    flag = True if delete else False
                
                output = True if flag else False
                return output
                
            else:
                output = 'Auth err'
                return False
            
        except Exception as e:
            output = str(e)
            return False
            
        finally:
            logger.log('PetDataHandler','delete_all_users_pets',token, output)