const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  html: path.resolve(__dirname, 'public', 'index.html'),
  public: path.resolve(__dirname, 'public'),
};

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  console.log(paths.html, path.resolve(paths.public, 'favicon.ico'));

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.ico$/,
          use: 'file-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
        favicon: path.resolve(paths.public, 'favicon.png'),
      }),
    ],
  };
};