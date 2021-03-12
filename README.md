# Prox Server for Nature Remo Local API

[Local API](https://local-swagger.nature.global/) of [Nature Remo](https://nature.global/nature-remo/)
has the following issues:

* Does not respond to HTTP OPTIONS method
* Does not respond if a request has many HTTP headers

Therefore, in order to call local API of Remo from the fetch API etc., you need a proxy server
that responds to HTTP OPTIONS method, reduces the request headers, and calls the API.
This application is a proxy server to achieve this.

## Useage

First, install the required modules with the following command:

```sh
npm ci
```

Next, copy `config/default.json` to create `config / production.json`. Then change the settings in
`config/production.json` as needed. The setting values mean the following:

name | type | description
--- | --- | ---
`httpServer.port` | `number` | Port number used by the proxy server.
`httpServer.accessControlAllowOrigin` | `string` | The origin to which the CORS request responds. The specified value is set in `access-control-allow-origin` in the response header.
`remoLocalApiOrigin` | `string` | Origin of the Remo Local API. (e.g.: `'http://192.168.1.10'`)

> Note: The setting values do not have to be in `config/production.json` as long as the contents are the same as in `config/default.json`.

After setting, the proxy server will start with the following command:

```sh
NODE_ENV=production node index.js
```

Now you can proxy requests to the Remo Local API to specified port on this server.
