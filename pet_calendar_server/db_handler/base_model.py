
from bson.objectid import ObjectId
from log.logger import Logger

logger = Logger()

class BaseModel():
    __abstract__ = True 
    
    @classmethod
    def get_obj_by_id(cls, id):
        '''
        28.11.24
        Mir
        Input: id as str    
        Output: dict obj / False / None
        '''
        try:
            collection = cls.access_collection()
            result = collection.find_one({'_id': ObjectId(id)})
            output = result if result else None
            return output
        
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log(cls.__name__,'get_obj_by_id',id,output)


    @classmethod
    def get_fields_by_id(cls, id, fields):
        '''
        04.12.24
        Mir
        Input: id as str, fields as list    
        Output: dict obj / False / None
        '''
        try:
            collection = cls.access_collection()
            fields_dict = {field : 1 for field in fields}
            fields_dict['_id'] = 0
            result = collection.find_one({'_id': ObjectId(id)}, fields_dict)
            output = result if result else None
            return output
        
        except Exception as e:
            output = str(e)
            return False
        
        finally:
            logger.log(cls.__name__,'get_fields_by_id',(id, fields),output)
            
        
    @classmethod
    def get_all_obj(cls):
        '''
        28.11.24
        Mir
        Input: none
        Output: list of dicts / False / None
        '''
        try:
            collection = cls.access_collection()
            results = collection.find()
            if results:
                result_list = [{**result, "_id": str(result["_id"])} for result in results]
                output = result_list
                return result_list
            
            else:
                output = None
                return None
            
        except Exception as e:
            output = str(e)
            return False

        finally:
           logger.log(cls.__name__,'get_all_obj','none',output)  


    @classmethod
    def get_obj_by_filter(cls, filter_dict):
        '''
        28.11.24
        Mir
        Input: dict (exp. {'name':'popo','DOB':'10/15/22'})
        Output: list of dicts / False / None
        '''
        try:
            collection = cls.access_collection()
            results = collection.find(filter_dict)  
            if results:
                result_list = [{**result, "_id": str(result["_id"])} for result in results]
                output = result_list
                return result_list
            
            else:
                output = None
                return None
            
        except Exception as e:
            output = str(e)
            return False

        finally:
           logger.log(cls.__name__,'get_obj_by_filter',filter_dict,output)  
           
           
    @classmethod
    def get_fields_by_filter(cls, filter_dict, fields):
        '''
        04.12.24
        Mir
        Input: dict (exp. {'name':'popo','DOB':'10/15/22'}), fileds as list
        Output: list of dicts / False / None
        '''
        try:
            collection = cls.access_collection()
            fields_dict = {field : 1 for field in fields}
            results = collection.find(filter_dict, fields_dict)
            if results:
                result_list = [{**result, "_id": str(result["_id"])} for result in results]
                output = result_list
                return result_list
            
            else:
                output = None
                return None
            
        except Exception as e:
            output = str(e)
            return False

        finally:
           logger.log(cls.__name__,'get_fields_by_filter',(filter_dict, fields),output)             
       
       
    @classmethod
    def add(cls, new_data_dict):
        '''
        28.11.24
        Mir
        Input: dict (exp. {'name':'popo','DOB':'10/15/22'})
        Output: new obj id as str / False 
        '''
        try:
            collection = cls.access_collection()
            new = collection.insert_one(new_data_dict)
            output = new.inserted_id if new and new.inserted_id else False
            return output
        
        except Exception as e:
            output = str(e)
            return False

        finally:
            logger.log(cls.__name__,'add',new_data_dict,output)  
    
    
    @classmethod
    def update(cls, id, new_data_dict):
        '''
        28.11.24
        Mir
        Input: id as str, dict (exp. {'name':'popo','DOB':'10/15/22'})
        Output: True / False 
        '''
        try:
            collection = cls.access_collection()
            update = collection.update_one({'_id': ObjectId(id)}, {'$set':new_data_dict})
            output =  True if update.matched_count > 0 and update.modified_count > 0 else False
            return output
        
        except Exception as e:
            output = str(e)
            return False

        finally:
            logger.log(cls.__name__,'update',(id,new_data_dict),output) 
    
                  
    @classmethod
    def delete_obj(cls, id):
        '''
        28.11.24
        Mir
        Input: id as str
        Output: True / False / None
        '''
        try:
            collection = cls.access_collection()
            delete = collection.delete_one({'_id': ObjectId(id)})
            output =  True if delete.deleted_count > 0 else None
            return output
        
        except Exception as e:
            output = str(e)
            return False

        finally:
            logger.log(cls.__name__,'delete_obj',id,output) 
            
            
    @classmethod
    def delete_fields(cls, id, fields_to_delete):
        '''
        04.12.24
        Mir
        Input: id as str, fields_to_delete as list
        Output: True / False 
        '''
        try:
            collection = cls.access_collection()
            fields_to_delete_dict = {field: "" for field in fields_to_delete}
            update = collection.update_one({'_id': ObjectId(id)}, {'$unset':fields_to_delete_dict})
            output =  True if update.matched_count > 0 and update.modified_count > 0 else False
            return output
        
        except Exception as e:
            output = str(e)
            return False

        finally:
            logger.log(cls.__name__,'delete_fields',(id,fields_to_delete),output) 