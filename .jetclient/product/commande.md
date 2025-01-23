```toml
name = 'commande'
method = 'POST'
url = 'http://localhost:8080/commandes'
sortWeight = 5000000
id = 'd47275ee-7003-4dbc-8f5b-456f73d65e71'

[body]
type = 'JSON'
raw = '''
{
  "clientId": 1,
  "description": "Test",
  "status": "NEW"
}'''
```
