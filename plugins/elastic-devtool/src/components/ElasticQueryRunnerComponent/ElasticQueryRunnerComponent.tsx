import { useState } from 'react';
import { useAsync } from 'react-use';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { elasticDevToolApiRef } from '../../ElasticDevToolApi';

export const ElasticQueryRunnerComponent = () => {
  const apiClient = useApi(elasticDevToolApiRef);
  const alertApi = useApi(alertApiRef);

  const [selectedIndex, setSelectedIndex] = useState('');
  const [queryText, setQueryText] = useState('');
  const [response, setResponse] = useState<any>(null);

  const { value: indices, loading, error } = useAsync(async () => {
    return await apiClient.indices();
  }, [apiClient]);

  const runQuery = async () => {
    if (!selectedIndex) {
      alertApi.post({
        message: 'Please select an index',
        severity: 'warning',
      });
      return;
    };
    if (!queryText.trim()) {
      alertApi.post({
        message: 'Query cannot be empty',
        severity: 'warning',
      });
      return;
    };

    try {
      const result = await apiClient.search(selectedIndex, JSON.parse(queryText));
      setResponse(result);
    } catch (err: any) {
      alertApi.post({
        message: `Invalid JSON or query failed: ${err.message}`,
        severity: 'error',
      });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error loading indices: {error.message}</div>;

  return (
    <Grid spacing={3}>
      <FormControl fullWidth>
        <InputLabel id="index-label">Choose Index</InputLabel>
        <Select
          labelId="index-label"
          value={selectedIndex}
          label="Choose Index"
          onChange={e => setSelectedIndex(e.target.value as string)}
        >
          {(indices ?? []).map((i: string) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Elasticsearch Query (JSON)"
        multiline
        minRows={6}
        value={queryText}
        onChange={e => setQueryText(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder={`{ "query": { "match_all": {} } }`}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={runQuery}
        disabled={!selectedIndex}
      >
        Run Query
      </Button>

      {response && (
        <pre style={{ background: '#111', color: '#0f0', padding: 16 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </Grid>
  );
};
