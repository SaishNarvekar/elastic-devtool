import { createDevApp } from '@backstage/dev-utils';
import { elasticDevtoolPlugin, ElasticDevtoolPage } from '../src/plugin';

createDevApp()
  .registerPlugin(elasticDevtoolPlugin)
  .addPage({
    element: <ElasticDevtoolPage />,
    title: 'Root Page',
    path: '/elastic-devtool',
  })
  .render();
