const logoutRouting = (method, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    
    const logoutPageHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Shop – Logout</title>
</head>
<body>
    <h1>Logout</h1>
    <nav>
        <a href="/">Strona główna</a>
        <a href="/kill">Zamknij aplikację</a>
    </nav>
</body>
</html>`;

    response.statusCode = 200;
    response.end(logoutPageHtml);
};

module.exports = { logoutRouting };