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
            this.objects = this.objects.sort((a, b) => a.id - b.id);
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

    updateOne = async (id, newObject) => {
        await this.getAll();

        const beforeFilterSize = this.objects.length;

        // Creo listado auxiliar con todos los objetos menos el que se va actualizar
        const auxObjects = this.objects.filter((o) => o.id != id);

        if (beforeFilterSize == this.objects.length) throw `No se encontró el id ${id}`;

        // Guardo el nuevo objeto
        newObject.id = id;
        auxObjects.push(newObject);

        this.objects = auxObjects;

        await this.saveAll();
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
        if (!object) throw `No se encontró el id ${id}`;

        return object;
    }

    deleteById = async (id) => {
        await this.getAll();

        const beforeFilterSize = this.objects.length;
        this.objects = this.objects.filter(o => o.id !== id);
        if (beforeFilterSize == this.objects.length) throw `No se encontró el id ${id}`;

        await this.saveAll();
    }

    deleteAll = async () => {
        this.objects = new Array();
        await this.saveAll();
    }

}

module.exports = { Container };