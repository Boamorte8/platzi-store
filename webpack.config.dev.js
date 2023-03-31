import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.js', '.jsx'],
    alias: {
      '@components': join(
        dirname(fileURLToPath(import.meta.url)),
        './src/components/'
      ),
      '@containers': join(
        dirname(fileURLToPath(import.meta.url)),
        './src/containers/'
      ),
      '@context': join(
        dirname(fileURLToPath(import.meta.url)),
        './src/context/'
      ),
      '@hooks': join(dirname(fileURLToPath(import.meta.url)), './src/hooks/'),
      '@routes': join(dirname(fileURLToPath(import.meta.url)), './src/routes/'),
      '@styles': join(dirname(fileURLToPath(import.meta.url)), './src/styles/'),
      '@assets': join(dirname(fileURLToPath(import.meta.url)), './src/assets/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css|.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: join(dirname(fileURLToPath(import.meta.url)), './dist'),
    // watchFiles: ['./src/**/*', './public/**/*'],
    // liveReload: true,
    // hot: true,
    compress: true,
    port: 8000,
    open: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [['optipng', { optimizationLevel: 5 }]],
        },
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
