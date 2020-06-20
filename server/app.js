import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import bodyParser from 'body-parser';

import { renderServerSideApp } from './renderServerSideApp';
import { todoRoutes } from './todoApi';

import router from './routes/routes';

const { PUBLIC_URL = '' } = process.env;

// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'), {
    maxage: Infinity
  })
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'), {
    maxage: '30 days'
  })
);

app.use(morgan('tiny'));

// Demo API endpoints
app.use(todoRoutes());

// ssr with context
app.use(router);

// Cars list
app.route('/api/cars').get((req, res) => {
  res.sendFile(__dirname + '/public/cars.json');
});

// Individual cars
app.route('/api/cars/1').get((req, res) => {
  res.sendFile(__dirname + '/public/car_1.json');
});

app.route('/api/cars/2').get((req, res) => {
  res.sendFile(__dirname + '/public/car_2.json');
});

app.route('/api/cars/3').get((req, res) => {
  res.sendFile(__dirname + '/public/car_3.json');
});

// Employee list
app.route('/api/employee').get((req, res) => {
  res.sendFile(__dirname + '/public/employee.json');
});

// Route for handling 404 requests(unavailable routes)
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

//500 error handler
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

app.use(clientErrorHandler);

app.use(
  responseTime((_req, res, time) => {
    res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
  })
);

app.use(renderServerSideApp);
