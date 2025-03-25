const { homeRouting } = require('./home');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');
const { STATUS_CODE } = require('../constants/statusCode');

const requestRouting = async (request, response) => {
    const { method, url } = request;
    const timestamp = new Date().toISOString();

    console.log(`INFO [${timestamp}]: ${method} - ${url}`);

    try {
        if (url === '/') {
            homeRouting(method, response);
        } else if (url.startsWith('/product')) {
            await productRouting(method, url, request, response);
        } else if (url === '/logout') {
            logoutRouting(method, response);
        } else if (url === '/kill') {
            console.log(`PROCES [${timestamp}]: wylogowanie zostało zainicjowane, aplikacja zostanie zamknięta`);
            process.exit(0);
        } else {
            console.log(`BŁĄD [${timestamp}]: żądany adres URL ${url} nie istnieje`);
            
            response.statusCode = STATUS_CODE.NOT_FOUND;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(`
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Błąd 404</title>
</head>
<body>
    <h1>404 Nie znaleziono</h1>
    <p>Żądany adres URL ${url} nie został znaleziony na serwerze.</p>
</body>
</html>`);
        }
    } catch (error) {
        console.error(`BŁĄD [${timestamp}]: ${error.message}`);
        response.statusCode = 500;
        response.end('Wystąpił błąd serwera');
    }
};

module.exports = { requestRouting };