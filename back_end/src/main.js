const api = require('./api/api.js');

const PORT = process.env.PORT || 3001;

api.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});