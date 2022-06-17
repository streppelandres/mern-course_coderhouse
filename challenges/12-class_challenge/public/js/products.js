const PRODUCTS_UTILS = {
    list: {
        elementId: 'products-wrapper',
        show: async () => {
            const productsView = await fetch('/products');
            document.getElementById(PRODUCTS_UTILS.list.elementId).innerHTML = await productsView.text();
        },
        add: () => {
            SOCKET.emit('products-add', PRODUCTS_UTILS.form.getData());
        }
    },
    form : {
        elementId: 'products-add-form',
        getData: () => {
            let formData = {};
            new FormData(document.getElementById(PRODUCTS_UTILS.form.elementId)).forEach((value, key) => formData[key] = value);
            return formData;
        }
    }
};

// Ni bien carga hago un fetch para traer el listado de productos
(async () => {
    await PRODUCTS_UTILS.list.show();
})();

// Cuando se agregue un producto, el back va emitir este evento
SOCKET.on('products-list', () => {
    // Hago un fetch para cargar los productos en lugar de recibirlo por acá
    PRODUCTS_UTILS.list.show();
});

// Event listener al botón de agregar nuevo producto
document.getElementById('products-add-button').onclick = e => {
    e.preventDefault();
    PRODUCTS_UTILS.list.add();
};