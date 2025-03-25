const fs = require('fs').promises;
const { STATUS_CODE } = require('../constants/statusCode');

const productRouting = async (method, url, request, response) => {
    const renderAddProductPage = () => {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        const addProductHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Shop – Dodaj produkt</title>
</head>
<body>
    <h1>Dodaj produkt</h1>
    <form method="POST" action="/product/add">
        <input type="text" name="name" placeholder="Nazwa produktu" required>
        <textarea name="description" placeholder="Opis produktu" required></textarea>
        <button type="submit">Dodaj produkt</button>
    </form>
    <nav>
        <a href="/">Strona główna</a>
        <a href="/product/new">Najnowszy produkt</a>
        <a href="/logout">Wyloguj</a>
    </nav>
</body>
</html>`;
        response.statusCode = 200;
        response.end(addProductHtml);
    };

    const renderNewProductPage = async () => {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        
        try {
            const data = await fs.readFile('product.txt', 'utf8');
            const product = JSON.parse(data);
            
            const newProductHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Shop – Najnowszy produkt</title>
</head>
<body>
    <h1>Najnowszy produkt</h1>
    <div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
    </div>
    <nav>
        <a href="/">Strona główna</a>
        <a href="/product/add">Dodaj produkt</a>
        <a href="/logout">Wyloguj</a>
    </nav>
</body>
</html>`;
            
            response.statusCode = 200;
            response.end(newProductHtml);
        } catch {
            const noProductHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Shop – Brak produktów</title>
</head>
<body>
    <h1>Brak nowych produktów</h1>
    <nav>
        <a href="/">Strona główna</a>
        <a href="/product/add">Dodaj produkt</a>
        <a href="/logout">Wyloguj</a>
    </nav>
</body>
</html>`;
            
            response.statusCode = 200;
            response.end(noProductHtml);
        }
    };

    const addNewProduct = (request, response) => {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        
        request.on('end', async () => {
            const productData = Object.fromEntries(new URLSearchParams(body));
            
            try {
                await fs.writeFile('product.txt', JSON.stringify(productData));
                
                response.setHeader("Location", "/product/new");
                response.statusCode = STATUS_CODE.FOUND;
                response.end();
            } catch {
                response.statusCode = 500;
                response.end('Błąd zapisu produktu');
            }
        });
    };

    if (url === '/product/add' && method === 'GET') {
        renderAddProductPage();
    } else if (url === '/product/add' && method === 'POST') {
        addNewProduct(request, response);
    } else if (url === '/product/new') {
        await renderNewProductPage();
    } else {
        console.warn(`BŁĄD: żądany adres URL ${url} nie istnieje`);
    }
};

module.exports = { productRouting };