const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // Para el modo de trabajo, development o production
    node: 'production',

    // Para definir el punto de entrada de nuestro código
    entry: './src/index.ts',
    target: 'node',

    // Permite el correcto funcionamiento con algunas librerías externas (en este caso, express)
    externals: [nodeExternals()],

    // Para definir el punto de salida
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },

    // Configura cómo se resuelven los módulos
    resolve: {
        extensions: ['.ts', '.js']
    },

    // Sirve para aclararle a Webpack cómo debe procesar los loaders que queramos en un proyecto
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}