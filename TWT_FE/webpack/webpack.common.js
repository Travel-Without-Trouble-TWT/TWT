const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|webp)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name][hash][ext]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [],
    // }),
    new ProgressPlugin(true),
  ],
  devServer: {
    historyApiFallback: true, // History 라우팅 대체 사용 설정
    port: 3000,
    hot: true,
    open: true,
  },
  performance: {
    hints: false,
  },
};
