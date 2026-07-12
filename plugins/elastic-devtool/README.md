
# Elastic Dev Tool Plugin for Backstage (Frontend)

![Backstage Logo](https://backstage.io/img/logo.svg)

> [!TIP]
> Modern Elasticsearch query and management UI for Backstage.

---

## Overview

`@saishnarvekar/plugin-elastic-devtool` is a feature-rich Backstage plugin that brings Elasticsearch query, index, and cluster management directly into your developer portal. Designed for extensibility and ease of use, it empowers teams to interact with Elasticsearch from a unified interface.

---

## Features

- Query runner with syntax highlighting and auto-complete
- Result viewer (JSON, table, chart)
- Index browser and management
- Cluster health and stats dashboard
- Works with Backstage's permission and plugin system

---

## Installation

Add the plugin to your Backstage app:

```bash
yarn --cwd packages/app add @saishnarvekar/plugin-elastic-devtool
```

---

## Usage

Import and add the plugin page to your app's router (e.g. in `App.tsx`):

```tsx
import { ElasticDevToolPage } from '@saishnarvekar/plugin-elastic-devtool';

// ...existing code...
<Route path="/elastic-devtool" element={<ElasticDevToolPage />} />
```

Configure your Elasticsearch connection in `app-config.yaml`:

```yaml
elastic:
	baseUrl: 'http://localhost:9200'
	username: 'elastic'  # optional
	password: 'password' # optional
```

Start your Backstage app and navigate to `/elastic-devtool` in the sidebar.

---

## Development

To develop or test the plugin in isolation:

```bash
yarn start
```

This will launch a local Backstage instance with the plugin enabled for rapid iteration.

---

## Resources

- [Backstage Documentation](https://backstage.io/docs)
- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
- [Backstage Plugin Authoring](https://backstage.io/docs/plugins/)

---

> [!IMPORTANT]
> For backend API support, see [`@saishnarvekar/plugin-elastic-devtool-backend`](../elastic-devtool-backend/).
