const homeRouting = (method, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    
    const homePageHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Shop – Home</title>
</head>
<body>
    <h1>Home</h1>
    <nav>
        <a href="/product/add">Dodaj produkt</a>
        <a href="/product/new">Najnowszy produkt</a>
        <a href="/logout">Wyloguj</a>
    </nav>
</body>
</html>`;

    response.statusCode = 200;
    response.end(homePageHtml);
};

module.exports = { homeRouting };