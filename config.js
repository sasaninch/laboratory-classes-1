// Zdefiniowanie portu dla serwera
const PORT = process.env.SERVER_PORT || 3000;

// Eksport portu dla innych modułów
module.exports = { PORT };