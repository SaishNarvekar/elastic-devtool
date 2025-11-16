import express from 'express';
import Router from 'express-promise-router';
import { Client } from '@elastic/elasticsearch';

export async function createRouter(options: {config: any}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  const esNode = options.config.getString("elastic-devtool.elasticsearch.node");
  const esUsername = options.config.getString("elastic-devtool.elasticsearch.username");
  const esPassword = options.config.getString("elastic-devtool.elasticsearch.password");
  
  const esClient = new Client({
    node: esNode,
    auth: {
      username: esUsername,
      password: esPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  router.get('/health', async (_, res) => {
    res.json({ status: 'ok' });
  });

  router.get('/indices', async (_, res) => {
    try {
      const result = await esClient.cat.indices({ format: 'json' });
      const names = result.map(r => r.index);
      res.json(names);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  router.post('/search', async (req, res) => {
    const body = req.body;
    console.info('Received ES query', { body });
    try {
      const result = await esClient.search(body);
      res.json(result);
    } catch (error) {
      console.error('ES query failed', { error });
      res.status(500).json({ error: String(error) });
    }
  });
  return router;
}
