import requests

response = requests.get('https://randomuser.me/api')
print(response.status_code)
print(response.json())
      
gender = response.json()['results'][0]['gender']
print(gender)
