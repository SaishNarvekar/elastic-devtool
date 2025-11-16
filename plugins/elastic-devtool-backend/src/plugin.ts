import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';

/**
 * elasticDevtoolPlugin backend plugin
 *
 * @public
 */
export const elasticDevtoolPlugin = createBackendPlugin({
  pluginId: 'elastic-devtool',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ httpRouter, config }) {
        httpRouter.use(
          await createRouter({ config }),
        );
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
