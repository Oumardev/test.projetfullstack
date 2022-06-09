import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .serializers import MapSerializer
from .models import Map

class MapConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

        self.send(text_data=json.dumps({
            'type': 'connection',
            'message' : 'You are connected'
        }))

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        encode = message[:-1]
        decode = bytes.fromhex(encode).decode('utf-8')

        m = Map(
            speed=float(decode.split(',')[0]), 
            duration=float(decode.split(',')[1]), 
            latitude= float(decode.split(',')[2]), 
            longitude= float(decode.split(',')[3]), 
            datetime= decode.split(',')[4]
        )
        m.save()
        
        #une nouvelle insertion a eu lieu
        self.send(text_data=json.dumps({
            'type': 'new_insertion',
            'message' : {'latitude': m.latitude, 'longitude': m.longitude }
        }))

       