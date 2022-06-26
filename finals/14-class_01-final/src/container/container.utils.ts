import { existsSync } from 'fs';
import { readFile, writeFile, mkdir } from 'fs/promises';

export default class Container {
    private static readonly DIRECTORY: string = './data/';

    private name: string;
    private path: string;
    private objects: Array<ContainerModel>;

    public constructor(name: string) {
        this.name = name;
        this.path = Container.DIRECTORY + this.name;
        this.objects = new Array();
        Container.mkdir();
    }

    private static mkdir = async (): Promise<void> => {
        try {
            if (existsSync(Container.DIRECTORY)) return;
            await mkdir(Container.DIRECTORY);
        } catch (error) {
            throw new Error(`Error trying to create the directory: ${Container.DIRECTORY}`);
        }
    }

    public getAll = async (): Promise<Array<ContainerModel>> => {
        try {
            this.objects = await JSON.parse(
                await readFile(this.path, "utf-8")
            );
            return this.objects;
        } catch (error) {
            throw new Error(`Error trying to read file: ${this.path}`);
        }
    }

    private saveAll = async (): Promise<void> => {
        try {
            this.objects = this.objects.sort((a: any, b: any) => a.id - b.id);
            await writeFile(this.path, JSON.stringify(this.objects, null, '\t'), "utf-8");
        } catch (error) {
            throw new Error(`Error trying to write file: ${this.path}`);
        }
    }

    public saveOne = async (object: ContainerModel): Promise<number> => {
        try {
            await this.getAll();
            object.id = this.objects.length ? (this.objects[this.objects.length - 1].id + 1) : 1;
            this.objects.push(object);
            await this.saveAll();
            return object.id;
        } catch (error) {
            throw new Error(`Error trying to save object: ${object}`);
        }
    }

    public getById = async (id: number): Promise<ContainerModel> => {
        await this.getAll();

        let object = this.objects.filter((o) => o.id === id)[0];
        if (!object) throw new Error(`No se encontró el id ${id}`);

        return object;
    }
}