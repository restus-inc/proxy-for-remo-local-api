const http = require('http');
const httpProxy = require('http-proxy');
const config = require('config');

const proxy = httpProxy.createProxyServer({});
proxy.on('proxyReq', (proxyReq) => {
  proxyReq.getHeaderNames().forEach((headerName) => {
    proxyReq.removeHeader(headerName);
  })
  proxyReq.setHeader('accept', 'application/json');
  proxyReq.setHeader('X-Requested-With', 'local');
});
proxy.on('proxyRes', (_proxyRes, _req, res) => {
  res.setHeader('access-control-allow-origin', config.get('httpServer.accessControlAllowOrigin'));
});

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-headers': 'Authorization, Content-Type, Accept-Encoding, X-Requested-With, User-Agent',
      'access-control-allow-methods': 'GET, POST, PATCH, PUT, DELETE',
      'access-control-allow-origin': config.get('httpServer.accessControlAllowOrigin'),
      'access-control-expose-headers': 'ETag, Link, Location, X-Rate-Limit-Limit, X-Rate-Limit-Remaining, X-Rate-Limit-Reset',
      'access-control-max-age': 86400,
    });
    res.end();
  } else {
    proxy.web(req, res, { target: config.get('remoLocalApiOrigin') });
  }
});

server.listen(config.get('httpServer.port'));
