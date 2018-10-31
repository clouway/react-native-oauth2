import { Linking } from 'react-native'

const authorizationUrl = (url, appId, callback, scope, responseType = 'token') =>
  `${url}?scope=${encodeURIComponent(scope)}&
  redirect_uri=${encodeURIComponent(callback)}&
  response_type=${responseType}&
  client_id=${appId}`.replace(/\s+/g, '')

export default class {
  constructor(clientId, callback, authUrl, tokenUrl) {
    this.authenticate = this.authenticate.bind(this)
    this.clientId = clientId
    this.callback = callback
    this.authUrl = authUrl
    this.tokenUrl = tokenUrl
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      const handleUrl = event => {
        const authCode = event.url.substring(
          event.url.indexOf('=') + 1,
          event.url.length
        )
        const tokenRequest = {
          code: authCode,
          client_id: this.clientId,
          redirect_uri: this.callback,
          grant_type: 'authorization_code'
        }
        let s = []
        for (let key in tokenRequest) {
          if (tokenRequest.hasOwnProperty(key)) {
            s.push(`${encodeURIComponent(key)}=${encodeURIComponent(tokenRequest[key])}`)
          }
        }
        fetch(this.tokenUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: s.join('&')
        })
          .then(response => resolve(response))
          .catch(error => reject(error))
        Linking.removeEventListener('url', handleUrl)
      }
      Linking.addEventListener('url', handleUrl)
      Linking.openURL(authorizationUrl(this.authUrl, this.clientId, this.callback, 'code'))
    })
  }
}
