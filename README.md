# Elastic Dev Tool Plugin for Backstage

![Backstage Logo](https://backstage.io/img/logo.svg)

A comprehensive Backstage plugin suite for Elasticsearch integration, providing developers with powerful tools to query, analyze, and visualize Elasticsearch data directly within the Backstage developer portal.

## Overview

This repository contains the development environment and documentation for the Elastic Dev Tool plugin for Backstage. The plugin consists of:

- **Frontend Plugin** (`plugins/elastic-devtool/`): React components for Elasticsearch query execution and result visualization
- **Backend Plugin** (`plugins/elastic-devtool-backend/`): API endpoints and Elasticsearch client integration (published as `@saishnarvekar/plugin-elastic-devtool-backend`)

The included Backstage application serves as a development and testing environment for the plugin.

## Features

- **Query Runner Component**: Execute Elasticsearch queries with syntax highlighting and auto-completion
- **Result Visualization**: Display query results in tabular, JSON, or chart formats
- **Index Management**: Browse and manage Elasticsearch indices
- **Real-time Monitoring**: View cluster health and performance metrics
- **Development Environment**: Full Backstage setup for plugin development and testing
- **Open Source**: Community-driven development with contribution guidelines

## Getting Started

### Prerequisites

- Node.js 20 or 22
- Yarn package manager
- Elasticsearch instance (version 7.x or 8.x)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backstage
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure Elasticsearch connection:
   - Update `app-config.yaml` with your Elasticsearch host and credentials
   - For local development, modify `app-config.local.yaml`

### Running the Development Environment

Start the Backstage application:
```bash
yarn start
```

Access the application at `http://localhost:3000`. The Elastic Dev Tool plugin will be available in the sidebar.

### Plugin Development

#### Frontend Plugin

The frontend plugin is located in `plugins/elastic-devtool/`. To develop:

1. Navigate to the plugin directory:
   ```bash
   cd plugins/elastic-devtool
   ```

2. Start in isolation for faster development:
   ```bash
   yarn start
   ```

#### Backend Plugin

The backend plugin is published separately. For development of the backend:

1. The source is in `plugins/elastic-devtool-backend/`
2. Published package: `@saishnarvekar/plugin-elastic-devtool-backend`

## Usage

### Installing the Plugin in Your Backstage Instance

#### Frontend Plugin

```bash
# From your Backstage root
yarn --cwd packages/app add @saishnarvekar/plugin-elastic-devtool
```

Add to your app configuration in `packages/app/src/App.tsx`:

```tsx
import { ElasticDevToolPage } from '@saishnarvekar/plugin-elastic-devtool';

const routes = (
  <Routes>
    // ... other routes
    <Route path="/elastic-devtool" element={<ElasticDevToolPage />} />
  </Routes>
);
```

#### Backend Plugin

```bash
# From your Backstage root
yarn --cwd packages/backend add @saishnarvekar/plugin-elastic-devtool-backend
```

Add to your backend in `packages/backend/src/index.ts`:

```ts
const backend = createBackend();
// ...
backend.add(import('@saishnarvekar/plugin-elastic-devtool-backend'));
```

### Configuration

Configure the plugin in your `app-config.yaml`:

```yaml
elastic-devtool:
  elasticsearch:
    node: 'https://localhost:9200'
    username: 'elastic' # optional
    password: 'password' # optional
```

## Development

### Project Structure

```
packages/
├── app/                 # Backstage frontend application
├── backend/             # Backstage backend services
plugins/
├── elastic-devtool/     # Frontend plugin source
└── elastic-devtool-backend/ # Backend plugin source
```

### Available Scripts

- `yarn start`: Start development servers
- `yarn build:all`: Build all packages
- `yarn test`: Run tests
- `yarn lint`: Lint code (fix branch reference if needed)
- `yarn fix`: Auto-fix linting issues

### Testing

Run tests:
```bash
yarn test
```

Run end-to-end tests:
```bash
yarn test:e2e
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up your development environment
- Code style and standards
- Submitting pull requests
- Reporting issues

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `yarn test`
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- [Issues](https://github.com/SaishNarvekar/elastic-devtool/issues)
- [Discussions](https://github.com/SaishNarvekar/elastic-devtool/discussions)
- [Backstage Community](https://backstage.io/community)

## Resources

- [Backstage Documentation](https://backstage.io/docs)
- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
- [Backstage Plugin Development Guide](https://backstage.io/docs/plugins/)
