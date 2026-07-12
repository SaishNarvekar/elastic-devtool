import { useState } from 'react';
import { useAsync } from 'react-use';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import { elasticDevToolApiRef } from '../../ElasticDevToolApi';
import { ElasticQueryResponseComponent } from '../ElasticQueryResponseComponent';

export const ElasticQueryRunnerComponent = () => {
  const apiClient = useApi(elasticDevToolApiRef);
  const alertApi = useApi(alertApiRef);

  const [selectedIndex, setSelectedIndex] = useState('');
  const [queryText, setQueryText] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isTable, setIsTable] = useState(true);

  const {
    value: indices,
    loading,
    error,
  } = useAsync(async () => {
    return await apiClient.indices();
  }, [apiClient]);

  const runQuery = async () => {
    if (!selectedIndex) {
      alertApi.post({
        message: 'Please select an index',
        severity: 'warning',
      });
      return;
    }
    if (!queryText.trim()) {
      alertApi.post({
        message: 'Query cannot be empty',
        severity: 'warning',
      });
      return;
    }

    try {
      const result = await apiClient.search(
        selectedIndex,
        JSON.parse(queryText),
      );
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
    <Grid container spacing={3} direction="column">
      <Grid item>
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
      </Grid>
      <Grid item>
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
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={runQuery}
          disabled={!selectedIndex}
        >
          Run Query
        </Button>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              checked={isTable}
              onChange={e => setIsTable(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          }
          label="Display as Table"
        />
      </Grid>
      <Grid item>
        <ElasticQueryResponseComponent response={response} isTable={isTable} />
      </Grid>
    </Grid>
  );
};
