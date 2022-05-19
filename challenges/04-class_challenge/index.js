const { Console } = require('console');
const fileSystem = require('fs');

class Container {
    static DIRECTORY = './tmp/';
    static ENCODING = 'utf-8';

    constructor(name) {
        this.name = name;
        this.path = Container.DIRECTORY + this.name;
        this.objects = new Array();
    }

    makeDirectory = async () => {
        try {
            await fileSystem.promises.mkdir(Container.DIRECTORY);
        } catch (error) {
            if (error) return console.log(`[makeDirectory] El directorio ${Container.DIRECTORY} ya existe o no pudo ser creado`);
        }
    }

    saveAll = async () => {
        try {
            await fileSystem.promises.writeFile(this.path, JSON.stringify(this.objects, null, '\t'), Container.ENCODING);
        } catch (error) {
            console.error('[saveAll] No se pudo guardar en el archivo');
        }
    }

    saveOne = async (object) => {
        await this.getAll();
        object.id = this.objects.length ? (this.objects[this.objects.length - 1].id + 1) : 1;
        this.objects.push(object);
        await this.saveAll();
        return object.id;
    }

    getAll = async () => {
        try {
            this.objects = await JSON.parse(await fileSystem.promises.readFile(this.path, Container.ENCODING));
            return this.objects;
        } catch (error) {
            console.error('[getAll] No se pudo leer el archivo');
        }
    }

    getById = async (id) => {
        await this.getAll();
        let object = this.objects.filter((o) => o.id === id)[0];
        return !object ? null : object;
    }

    deleteById = async (id) => {
        await this.getAll();
        this.objects = this.objects.filter(o => o.id !== id);
        await this.saveAll();
    }

    deleteAll = async () => {
        this.objects = new Array();
        await this.saveAll();
    }

}

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