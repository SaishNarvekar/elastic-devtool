import { createDevApp } from '@backstage/dev-utils';
import { elasticDevtoolPlugin, ElasticDevToolPage } from '../src/plugin';

createDevApp()
  .registerPlugin(elasticDevtoolPlugin)
  .addPage({
    element: <ElasticDevToolPage />,
    title: 'Root Page',
    path: '/elastic-devtool',
  })
  .render();
