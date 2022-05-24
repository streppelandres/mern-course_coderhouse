const { Container } = require('../utils/container/container');

(async () => {
    const container = new Container('prueba.json');

    await container.makeDirectory();

    await container.saveOne({
        "name": "Shrimp - Black Tiger 6 - 8",
        "price": 316.98,
        "thumbnail": "http://dummyimage.com/150x100.png/dddddd/000000"
    });
    await container.saveOne({
        "name": "Truffle Shells - Semi - Sweet",
        "price": 338.34,
        "thumbnail": "http://dummyimage.com/108x100.png/cc0000/ffffff"
    });
    await container.saveOne({
        "name": "Oysters - Smoked",
        "price": 165.55,
        "thumbnail": "http://dummyimage.com/180x100.png/ff4444/ffffff"
    });

    console.log('Leo todo el archivo: ');
    console.table(await container.getAll());

    console.log('Traigo un ID que no existe:');
    console.log(await container.getById(9999));

    console.log('Leo por ID: ');
    console.table(await container.getById(1));

    console.log('Elimino el ID [2]: ');
    await container.deleteById(2);
    console.table(await container.getAll());

    console.log('Elimino todos: ');
    // await container.deleteAll();
})();