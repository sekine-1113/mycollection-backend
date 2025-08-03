import app from './app';
import config from './config';
import { logger } from './logs/logger';

const port = config.PORT;
app.listen(port, () => {
  logger.info(`Server Running on: ${config.DOMAIN}:${port}`);
  if (config.ENVIRONMENT === 'develop') {
    console.log(`${config.DOMAIN}:${port}/swagger-ui`);
  }
});
