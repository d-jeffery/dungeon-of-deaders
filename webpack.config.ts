import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  // Here we define our base program directory
  context: path.resolve(__dirname, 'src'),
  // This is the main file to start our program with
  entry: './game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // It is generally better to use [chunkhash] in the filename instead of a
    // fixed filename, especially in production builds.
    // When you use a fixed filename, the browser may cache the file and reuse
    // it even if you make updates to your code. This means that users may not
    // see the updated code until they clear their cache, which can lead to
    // confusion and errors.
    // By using [chunkhash] in the filename, webpack will generate a unique hash
    // for each chunk based on its contents. When the contents of a chunk change,
    // the hash value changes, resulting in a new filename.
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    // Remove all files in the output directory that are not generated by the
    // current build
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'Dungeon Of Deaders',
      inject: 'head'
    })
  ]
};

export default config;