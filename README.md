# Card Blaster for Webex frontend

React.js single-page app for communicating with the Card Blaster backend to send adaptive cards for Webex on your behalf. The backend code is located [here](https://github.com/dchosnek/card-blaster-backend).

The `.env` file contains an environment variable that sets the application URL to be a `/cardblaster` instead of simply `/`. If this app is going to be deployed at the root of a web server, this variable can be deleted. 

```
PUBLIC_URL=/cardblaster
```