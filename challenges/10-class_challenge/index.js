const { Container } = require('../utils/container/container');
const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

const container = new Container('data_10-challenge.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));


app.get('/', async (_, res) => {
    res.render('pages/index');
});

app.get('/productos', async (_, res) => {
    res.render('pages/products', { products: await container.getAll() });
});

app.post('/productos', async (req, res) => {
    console.log(`Se va guardar el producto [${JSON.stringify(req.body)}]`);

    try {
        const { name, thumbnail, price } = req.body;
        await container.saveOne({ name, thumbnail, price });
        res.redirect("/");
    } catch (error) {
        res.status(500);
        res.send({ error: error });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}).on('error', (error) => {
    console.error("Error on server", error)
});