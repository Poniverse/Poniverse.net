import * as OAuthController from "../controllers/OAuthController";

export default (app) => {
  app.post('/auth/login', OAuthController.authenticate);
  app.post('/auth/refresh', OAuthController.refresh);
  app.post('/auth/logout', OAuthController.logout);
};
