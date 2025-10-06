import requests

url = 'http://127.0.0.1:8000/post_temperature'
myobj = {'temp': 4.0}

x = requests.post(url, json = myobj)

print(x.text)