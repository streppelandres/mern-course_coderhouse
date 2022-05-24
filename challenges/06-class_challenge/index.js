const { Container } = require('../utils/container/container');
const { randomInt } = require('../utils/random');

const container = new Container('prueba_06-challenge.json');

const express = require('express');
const app = express();
const port = 8080;

app.get('/products', async (_, res) => {
    res.json(await container.getAll());
});

app.get('/productsRandom', async (_, res) => {
    let products = await container.getAll();
    res.json(products[randomInt(1, products.length)]);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});