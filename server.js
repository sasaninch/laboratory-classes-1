const http = require('http');
const { PORT } = require('./config');
const { requestRouting } = require('./routing/routing');

const server = http.createServer((request, response) => {
    requestRouting(request, response);
});

server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});