const { Container } = require('../utils/container/container');
const express = require('express');
const { Router } = express;

const port = 8080;

const app = express();
const router = Router();

const container = new Container('data_08-challenge.json');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    console.log('Hola mundo!');
    res.sendFile(`${__dirname}/index.html`);
});

router.get('/productos', async (req, res) => {
    console.log('Retornando todos los productos');
    res.send(await container.getAll());
});

router.get('/productos/:id', async (req, res) => {
    console.log(`Retornando el producto con la id [${req.params.id}]`);
    try {
        res.send(await container.getById(Number(req.params.id)));
    } catch (error) {
        res.status(500);
        res.send({ error: error });
    }
});

router.post('/productos', async (req, res) => {
    console.log(`Se va guardar el producto [${JSON.stringify(req.body)}]`);
    try {
        const { name, thumbnail, price } = req.body;
        res.send({
            success: `Producto guardado con el id [${await container.saveOne({ name, thumbnail, price })}]`
        });
    } catch (error) {
        res.status(500);
        res.send({ error: error });
    }
});

router.put('/productos/:id', async (req, res) => {
    console.log(`Se va actualizar el producto con la id [${req.params.id}] y los campos [${JSON.stringify(req.body)}]`);
    try {
        const { name, thumbnail, price } = req.body;
        await container.updateOne(Number(req.params.id), { name, thumbnail, price });
        res.send({
            success: `Producto actualizado con el id [${req.params.id}]`
        });
    } catch (error) {
        res.status(500);
        res.send({ error: error });
    }
});

router.delete('/productos/:id', async (req, res) => {
    console.log(`Se va eliminar el producto con la id [${req.params.id}]`);
    try {
        await container.deleteById(Number(req.params.id));
        res.send({
            success: `Se eliminó el producto con el id [${req.params.id}]`
        });
    } catch (error) {
        res.status(500);
        res.send({ error: error });
    }
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}).on('error', (error) => {
    console.error("Error on server", error)
});