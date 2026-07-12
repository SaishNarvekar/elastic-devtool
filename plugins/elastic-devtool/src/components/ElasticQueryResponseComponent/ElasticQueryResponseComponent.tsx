import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

type ElasticQueryResponseProps = {
  response: any;
  isTable: boolean;
};

export const ElasticQueryResponseComponent = ({
  response,
  isTable,
}: ElasticQueryResponseProps) => {
  if (!response) return null;

  if (!isTable) {
    return (
      <div>
        <pre style={{ background: '#111', color: '#0f0', padding: 16 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    );
  }

  const hits = response.hits.hits;

  const sourceHeaders = new Set();

  hits.forEach((hit: any) => {
    Object.keys(hit._source).forEach(key => sourceHeaders.add(key));
  });

  const headers = [...sourceHeaders];

  const rows = hits.map((hit: any) => {
    const row = {
      ...hit._source,
    };
    return row;
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header: any) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row: any, rowIndex: any) => (
            <TableRow key={row._id || rowIndex}>
              {headers.map((header: any) => (
                <TableCell key={header}>{row[header] ?? ''}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
