const fs = require('fs');

class Container {
    static PATH = './tmp/';
    static ENCODING = 'utf-8';

    constructor(name) {
        this.name = name;
        this.objects = [];
    }

    utils = {
        generateId: () => {
            let id = this.objects.length ? (this.objects[this.objects.length - 1].id + 1) : 1;
            return id;
        },
        addToObjects: (object) => {
            object.id = this.utils.generateId();
            this.objects.push(object);
        }
    }

    save = async (object) => {
        try {
            this.utils.addToObjects(object);
            await fs.promises.writeFile(Container.PATH + this.name, JSON.stringify(this.objects), Container.ENCODING);
            return object.id;
        } catch (error) {
            console.error(error);
        }
    }

    getAll = async () => {
        try {
            this.objects = await JSON.parse(await fs.promises.readFile(Container.PATH + this.name, Container.ENCODING));
            return this.objects;
        } catch (error) {
            console.error(error);
        }
    }

    getById = async (id) => {
        try {
            let object = (await this.getAll()).filter((o) => o.id === id)[0];
            if (!object) throw `Objeto con el id [${id}] no encontrado`;
            return object;
        } catch (error) {
            console.error(error);
        }
    }
}

const container = new Container('prueba.json');

/*
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
container.save({aaaaaa:'asd', zxc: '123'})
*/

(async () => {
    //await container.getAll();

    //console.table(container.objects);

    //console.log(await container.getById(55));
})();




