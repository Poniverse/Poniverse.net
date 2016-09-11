import express from 'express';
import webpack from 'webpack';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import webpackDevConfig from '../webpack/webpack.config.dev-client';
import axios from 'axios';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import App from '../public/assets/server';

const app = express();

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = process.env.API_URL || `http://${clientConfig.host}:${clientConfig.port}`;

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      assets: false,
      colors: true,
      version: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      children: false
    },
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

routesConfig(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App);

app.listen(app.get('port'));
