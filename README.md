# react-native-oauth2
OAuth2 Package for RN

## Instalation
Add [NPM Registry](https://github.com/clouway/teamspace/wiki/NPM-Registry)
```
npm install clouway-react-native-oauth2 --save
```
## Usage
```javascript
  import Oauth from 'clouway-react-native-oauth2'

  const client = new Oauth(APP_ID, APP_CALLBACK, AUTH_URL, TOKEN_URL)

  client.authenticate().then(response => {
    // authentication was performed 
  }).catch(error => {
    // oops, got error during signing in, which could be shown to the user
  })
```
