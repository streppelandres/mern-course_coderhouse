class User {
    constructor(name, surname, books, pets) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }
    getFullName = () => {
        return `${this.name} ${this.surname}`;
    }
    addPet = (name, specie) => {
        this.pets.push({ name: name, specie: specie });
    }
    countPets = () => {
        return this.pets.length;
    }
    addBook = (name, author) => {
        this.books.push({ name: name, author: author });
    }
    getBookNames = () => {
        if (this.books.length <= 0) return;
        return this.books.map(b => b.name);
    }
}

const books = [
    { name: "Thirteen Reasons Why", author: "Jay Asher" },
    { name: "Aurora Rising", author: "Amie Kaufman and Jay Kristoff" },
    { name: "Immortal Beloved", author: "Cate Tiernan" },
    { name: "The Martian Chronicles", author: "Ray Bradbury" }
];

const pets = [
    { name: "Mora", specie: "Dog 🐶" },
    { name: "Pomelo", specie: "Cat 🐱" },
    { name: "Ellie", specie: "Guinea pig 🐭" }
]

const usuario = new User("John", "Doe", books, pets);

console.log(usuario.getFullName());

usuario.addPet("Ivy", "Guinea pig 🐭");

console.table(usuario.pets);

console.log(`User pets count: ${usuario.countPets()}`);

usuario.addBook("Gone Girl", "Gillian Flynn");

console.log(usuario.getBookNames());

console.table(usuario.books);