from pymongo.mongo_client import MongoClient
from Singleton import Singleton
class DatabaseConnection(metaclass=Singleton):
    def __init__(self):
        self.uri = "mongodb+srv://phamthehieuvtt123:1SqWXDd6SvtT5HYu@ai-server-cluster.a3afvc8.mongodb.net/?retryWrites=true&w=majority&appName=ai-server-cluster"
        self.conn = MongoClient(self.uri)
        try:
            self.conn.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
        self.speech_query = self.conn['ai-server']['speech-query-collection']
    def searchString(self, query):
        print(f"query: {query[:-1]}")
        q = [
                {
                    '$search': {
                        'index': "speech-query-key",
                        'text': {
                            'query': query,
                            'path': "key"
                        }
                    }
                },
                {
                    '$limit':1
                }, {
                    "$project": {
                        "_id":0,
                        "value":1
                    }
                }
            ]
        try:
            res = self.speech_query.aggregate(q).next()# Remove the square brackets around q
        except StopIteration:
            res = {"value":"Unsupport query"}
        return res
    def find(self,*arg,**args):
        return self.speech_query.find(*arg,**args)
    def find_one(self,*arg,**args):
        return self.speech_query.find_one(*arg,**args)
    def update_many(self,*arg,**args):
        return self.speech_query.update_many(*arg,**args)
    def update_one(self,*arg,**args):
        return self.speech_query.update_one(*arg,**args)
    def insert_one(self,*arg,**args):
        return self.speech_query.insert_one(*arg,**args)
    def insert_many(self,*arg,**args):
        return self.speech_query.insert_many(*arg,**args)
    def delete_one(self,*arg,**args):
        return self.speech_query.delete_one(*arg,**args)
    def delete_many(self,*arg,**args):
        return self.speech_query.delete_many(*arg,**args)
    def get_collection(self):
        return self.speech_query