const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');
dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

// wss.on() recebe o nome do evento e uma CB
wss.on("connection", (ws) => {
    // caso haja algum erro ja sera logado no console
    ws.on("error", console.error);
    
    // ao enviar uma mensagem esse bloco eh executado
    // lembrando que o intuito eh repassar a msg a todos os usuarios conectados 
    ws.on("message", (data) => {
        // usuario manda a msg, o servidor recebe e envia novamente para cada
        // usuario conectado
        wss.clients.forEach((client) => client.send(data.toString()));        
    });
    console.log("client connected");
});