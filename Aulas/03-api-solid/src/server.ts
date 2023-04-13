import { app } from "./app.js";

app.listen({
    host: '0.0.0.0', // evita problemas de conexão com aplicações frontend
    port: 3333,
}).then(() => {
    console.log('🚀 HTTP server running on port 3333!')
})