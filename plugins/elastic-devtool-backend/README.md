developing the plugin backend itself.

# Elastic Dev Tool Plugin for Backstage (Backend)

![Backstage Logo](https://backstage.io/img/logo.svg)

> [!TIP]
> Backend API for Elasticsearch management and query in Backstage.

## Overview

`@saishnarvekar/plugin-elastic-devtool-backend` provides the backend API and service layer for the Elastic Dev Tool plugin, enabling secure, robust Elasticsearch operations from your Backstage instance.

## Features

- REST API for Elasticsearch query and index management
- Secure proxy to your Elasticsearch cluster
- Cluster health and stats endpoints
- Built with Backstage backend best practices

### Screenshots

**Home Interface**
![Home Interface](https://raw.githubusercontent.com/SaishNarvekar/elastic-devtool/refs/heads/main/images/home.png)

**Table Results View**
![Table Results View](https://raw.githubusercontent.com/SaishNarvekar/elastic-devtool/refs/heads/main/images/table.png)

## Installation

Add the backend plugin to your Backstage backend:

```bash
yarn --cwd packages/backend add @saishnarvekar/plugin-elastic-devtool-backend
```

## Usage

Register the plugin in your backend (e.g. in `packages/backend/src/index.ts`):

```ts
import { elasticDevToolPlugin } from '@saishnarvekar/plugin-elastic-devtool-backend';

const backend = createBackend();
// ...existing code...
backend.add(elasticDevToolPlugin());
```

Configure your Elasticsearch connection in `app-config.yaml`:

```yaml
elastic-devtool:
  elasticsearch:
    node: 'https://localhost:9200'
    username: 'elastic' # optional
    password: 'password' # optional
```

## Development

To run the backend plugin in isolation for development:

```bash
yarn start
```

This will launch a local backend server for rapid development and testing.

## Resources

- [Backstage Backend Plugins](https://backstage.io/docs/backend-system/)
- [Elasticsearch Node.js Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/)
- [Backstage Plugin Authoring](https://backstage.io/docs/plugins/)

---

> [!IMPORTANT]
> Use together with [`@saishnarvekar/plugin-elastic-devtool`](https://www.npmjs.com/package/@saishnarvekar/plugin-elastic-devtool) for a complete frontend + backend solution.
