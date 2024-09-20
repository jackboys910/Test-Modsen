const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const paths = {
  html: path.resolve(__dirname, 'public', 'index.html'),
  public: path.resolve(__dirname, 'public'),
};

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      // publicPath: '/Test-Modsen/',
    },
    devServer: {
      historyApiFallback: true,
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
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        { test: /\.svg$/, use: ['@svgr/webpack', 'file-loader'] },
      ],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
        favicon: path.resolve(paths.public, 'favicon.png'),
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
