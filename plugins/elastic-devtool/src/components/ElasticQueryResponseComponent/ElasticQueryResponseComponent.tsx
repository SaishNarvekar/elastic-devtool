import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Editor from '@monaco-editor/react';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

type ElasticQueryResponseProps = {
  response: any;
  isTable: boolean;
};

export const ElasticQueryResponseComponent = ({
  response,
  isTable,
}: ElasticQueryResponseProps) => {
  const theme = useTheme();
  const userTheme = theme.palette.type === 'dark' ? 'vs-dark' : 'light';
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleOpenDocument = (document: any) => {
    setSelectedDocument(document);
    setDialogOpen(true);
  };

  const handleCloseDocument = () => {
    setDialogOpen(false);
    setSelectedDocument(null);
  };

  if (!response) return null;

  if (!isTable) {
    return (
      <div>
        <Editor
          height="400px"
          language="json"
          value={JSON.stringify(response, null, 2)}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
          }}
          theme={userTheme}
        />
      </div>
    );
  }

  const hits = response.hits.hits;

  const sourceHeaders = new Set();

  hits.forEach((hit: any) => {
    Object.keys(hit._source).forEach(key => sourceHeaders.add(key));
  });

  const headers = [...sourceHeaders, 'actions'];

  const rows = hits.map((hit: any) => {
    const row = {
      ...hit._source,
      actions: (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenDocument(hit._source)}
        >
          View Document
        </Button>
      ),
    };
    return row;
  });

  return (
    <>
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

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDocument}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Document Preview</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(selectedDocument, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDocument} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
