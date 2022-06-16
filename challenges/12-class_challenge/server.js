const { Container } = require('../utils/container/container');
const express = require('express');
const moment = require('moment');

const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 8080;

const productsContainer = new Container('data_12-challenge_products.json');
const messagesContainer = new Container('data_12-challenge_messages.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', express.static(`${__dirname}/public`));

app.get('/', async (_, res) => {
    res.render('pages/index');
});

app.get('/products', async (_, res) => {
    res.render('partials/products/list', { products: await productsContainer.getAll() });
});

app.get('/messages', async (_, res) => {
    res.json(await messagesContainer.getAll());
});

io.on('connection', async (socket) => {

    socket.on('products-add', async (product) => {
        const { name, thumbnail, price } = product;
        await productsContainer.saveOne({ name, thumbnail, price });
        io.sockets.emit('products-list');
    });

    socket.on('messages-send', async (messageData) => {
        const newMessage = {
            "author": messageData.author,
            "message": messageData.message,
            "time": moment().format('DD/MM/YYYY - HH:mm:ss')
        };

        // Lo guardo en el container
        await messagesContainer.saveOne(newMessage);

        // Lo emito asi lo appendea en el box
        io.sockets.emit('messages-append', newMessage);
    });

});

server.listen(port, () => {
    console.log(`[${moment().format('DD/MM/YYYY - HH:mm:ss')}] App listening on port ${port}`);
}).on('error', (error) => {
    console.error("Error on server", error)
});