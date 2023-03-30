import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()],
  },
};
