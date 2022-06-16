const { Container } = require('../utils/container/container');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 8080;

const container = new Container('data_12-challenge.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', express.static(`${__dirname}/public`));

app.get('/', async (_, res) => {
    res.render('pages/index');
});

app.get('/products', async (_, res) => {
    res.render('partials/products/list', { products: await container.getAll() });
});

io.on('connection', async (socket) => {
    socket.on('products-add', async (product) => {
        const { name, thumbnail, price } = product;
        await container.saveOne({ name, thumbnail, price });
        io.sockets.emit('products-list');
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
}).on('error', (error) => {
    console.error("Error on server", error)
});