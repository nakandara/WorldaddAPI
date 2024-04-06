import app from './app.js';
import fs from 'fs'
import https from 'https'

const port = process.env.PORT || 8080;

const key = fs.readFileSync('private.key')

const cert = fs.readFileSync('certificate.crt')
 

const cred = {
  key,
  cert

}

// Using ES6 arrow function to start the server and log a message
const httpsServers =  https.createServer(cred,app)
httpsServers.listen(8443)