import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import { ElasticDevToolApiClient, elasticDevToolApiRef } from './ElasticDevToolApi';

export const elasticDevtoolPlugin = createPlugin({
  id: 'elastic-devtool',
  apis: [
    createApiFactory({
      api: elasticDevToolApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new ElasticDevToolApiClient({ discoveryApi, fetchApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const ElasticDevToolPage = elasticDevtoolPlugin.provide(
  createRoutableExtension({
    name: 'ElasticDevToolPage',
    component: () =>
      import('./components/HomeComponent').then(m => m.HomeComponent),
    mountPoint: rootRouteRef,
  }),
);
