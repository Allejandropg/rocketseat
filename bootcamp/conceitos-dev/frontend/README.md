# Anotações
> Babel:  Converter(transpilar) código do React para um código que o browser entenda

> Webpack: Para cada tipo de arquivo(.js, .css, .png) eu vou converter o código de uma maneira diferente

## Loaders

- babel-loader
- css-loader
- image-loader
- etc-loader

```bash
yarn add @babel/cli @babel/core babel-loader @babel/preset-env @babel/preset-react webpack webpack-cli
```

### [Babel](https://babeljs.io/)
### [Webpack](https://webpack.js.org/concepts/)/webpack-dev-server
> uma biblioteca para desenvolver com o webpack de forma que toda vez que tiver uma alteração no código você não precise compilar

```js
{
  entry: resolve(__dirname,'src','index.js'), // arquivo padrão que vai ter todos os códigos
  output: { // configuração de onde vai ser salvo o compilado
    path: resolve(__dirname,'public'),
    filename: 'bundle.js'
  },
  devServer: { // config de onde fica o compilado para ficar lendo alterações
    contentBase: resolve(__dirname,'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,// define o tipo de arquivo
        exclude: /node_modules/,//pasta que não precisa considerar
        use: {// bibliotecas que o tipo de arquivo vai utilizar
          loader: 'babel-loader'
        }
      },
    ]
  }
}
```

## Principais pontos React
- Componentes
- Propriedades
- Estado

## Styles
```bash
yarn add styled-loader css-loader
```
Necessário adicionar a configuração no webpack.config para funcionar

```js
{
  test: /\.css$/,// define o tipo de arquivo
  exclude: /node_modules/,//pasta que não precisa considerar
  use: [// bibliotecas que o tipo de arquivo vai utilizar
    {loader: 'style-loader'},
    {loader: 'css-loader'}
  ]
}
```

## Files
```bash
yarn add file-loader
```
```js
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: [
    {loader: 'file-loader'},
  ]
}
```

