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

export const ElasticDevtoolPage = elasticDevtoolPlugin.provide(
  createRoutableExtension({
    name: 'ElasticDevtoolPage',
    component: () =>
      import('./components/HomeComponent').then(m => m.HomeComponent),
    mountPoint: rootRouteRef,
  }),
);
