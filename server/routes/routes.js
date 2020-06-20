import express from 'express';
import serverRenderer from './middleware/renderer';
import serviceConfig from './service-config.json';
// Routes
const router = express.Router();

const actionIndex = (req, res, next) => {
  serverRenderer()(req, res, next);
};

// Register all react route from service-config.json
const routesToReg = [];
const serviceData = JSON.parse(JSON.stringify(serviceConfig));
serviceData.forEach(provider => {
  provider.services.forEach(service => {
    service.reactRoutes.forEach(reactRoute => {
      let pref = '';
      if (reactRoute !== '^$') {
        pref = '^';
      }
      if (
        reactRoute !== '.*$' &&
        routesToReg.indexOf(`${pref}${reactRoute}`) === -1
      ) {
        routesToReg.push(`${pref}${reactRoute}`);
      }
    });
  });
});
routesToReg.forEach(route => {
  router.use(route, actionIndex);
});
router.use('/$', actionIndex);

export default router;
