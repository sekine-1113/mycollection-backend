import app from './app';
import config from './config';
import { logger } from './logger';

const port = config.PORT;
app.listen(port, () => {
  logger.info(`Server Running on: ${config.DOMAIN}:${port}`);
  logger.debug(`Swagger UI: ${config.DOMAIN}:${port}/swagger-ui`);
});
