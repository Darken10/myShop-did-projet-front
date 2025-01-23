```toml
name = 'newpwd'
method = 'POST'
url = 'http://localhost:8080/auth/reset-password/new-password'
sortWeight = 4000000
id = 'eb66e50f-1453-42b4-acfc-db829a4f67d8'

[body]
type = 'JSON'
raw = '''
{
"password": "password",
"jeton": "764402ec-4b37-4a5b-bbe1-1c018b5672d2"
}'''
```
