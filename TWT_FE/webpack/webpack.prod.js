const webpack = require('webpack');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.config({ path: path.join(__dirname, '../.env') });

module.exports = smp.wrap(
  merge(common, {
    mode: 'production',
    devtool: false,
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/i,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(process.env.PROD_BASE_URL),
        'process.env.IS_LOCAL': false,
        'process.env.NODE_ENV': JSON.stringify('production'),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        PUBLIC_KEY: JSON.stringify(process.env.PUBLIC_KEY),
        REACT_APP_KAKAO_MAP_KEY: JSON.stringify(
          process.env.REACT_APP_KAKAO_MAP_KEY
        ),
        REACT_APP_GOOGLE_CLIENT_ID: JSON.stringify(
          process.env.REACT_APP_GOOGLE_CLIENT_ID
        ),
        REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET: JSON.stringify(
          process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET
        ),
        REACT_APP_GOOGLE_OAUTH_REDIRECT: JSON.stringify(
          process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT
        ),
      }),
    ],
  })
);
