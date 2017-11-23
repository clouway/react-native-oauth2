# react-native-oauth2
OAuth2 Package for RN

## Usage
```javascript
  import Oauth from 'react-native-oauth2'

  const client = new Oauth(APP_ID, APP_CALLBACK, AUTH_URL, TOKEN_URL)

  client.authenticate().then(response => {
    // authentication was performed 
  }).catch(error => {
    // oops, got error during signing in, which could be shown to the user
  })
```
