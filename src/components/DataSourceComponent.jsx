import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Stack,
  Chip,
  Paper,
  useTheme
} from '@mui/material';
import { SvgIcon } from '@mui/material';
import ExcelUploader from './ExcelUploader';
import downloadExcelFromBase64 from '../apis/excelFiledownloader';

// --- Placeholder Icons ---
// In a real application, you would use proper SVG icons or an icon library.
// For this example, we'll create simple placeholder icons.

const S3Icon = (props) => (
  <SvgIcon {...props} viewBox="0 0 128 128">
    {/* A simple representation of stacked blocks for S3 */}
    <path fill="#F79B34" d="M24 68h32v32H24z" />
    <path fill="#F79B34" d="M48 44h32v32H48z" />
    <path fill="#F79B34" d="M72 20h32v32H72z" />
    <path fill="#F79B34" d="M48 92h32v32H48z" />
    <path fill="#F79B34" d="M72 68h32v32H72z" />
  </SvgIcon>
);

const AzureBlobIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    {/* A simple representation of the Azure logo */}
    <path fill="#0078D4" d="M12.33 6.87l-5.66 3.27-1.41-2.45 7.07-4.08 7.07 4.08-1.41 2.45-5.66-3.27zM4.26 14.13l1.41 2.45 5.66-3.27v-6.53l-7.07 4.08v3.27zm15.48 0l-7.07-4.08v6.53l5.66 3.27 1.41-2.45v-3.27zM12.33 17.13l-5.66-3.27-1.41 2.45 7.07 4.08 7.07-4.08-1.41-2.45-5.66 3.27z" />
  </SvgIcon>
);

const JdbcIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    {/* A simple representation of a database cylinder */}
    <path fill="#757575" d="M12 3c-4.42 0-8 1.79-8 4v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.31 0 6 1.34 6 3s-2.69 3-6 3-6-1.34-6-3 2.69-3 6-3zm0 14c-3.31 0-6-1.34-6-3v-1.54c1.39.9 3.59 1.54 6 1.54s4.61-.64 6-1.54V16c0 1.66-2.69 3-6 3z" />
  </SvgIcon>
);


const DataSourceComponent = ({ file, setFile }) => {
    const theme = useTheme();
  // --- Common Styles ---
  const headerStyle = {
    backgroundColor: theme.palette.header.main,
    padding: '4px',
    textAlign: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };
    const boxStyle = {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
  };

 
  return (
    <Box >
        <Grid container spacing={2}>
          {/* --- Left Column: Import Data --- */}
          <Grid size={{xs:12,md:6}} sx={boxStyle}> 
            <Typography sx={headerStyle} variant="h6">
              Import Data
            </Typography>
            <Box p={2}>
              <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                  <Stack spacing={2}>
                    <ExcelUploader file={file} setFile={setFile} />
                    <Button  variant="contained" fullWidth onClick={() => downloadExcelFromBase64()}>
                      Download Sample dataset
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* --- Right Column: Connect Data Source --- */}
          <Grid size={{xs:12,md:6}} sx={boxStyle}>
            <Typography sx={headerStyle} variant="h6">
              Connect Data Source
            </Typography>
            <Box p={2}> 
              <Stack spacing={4} alignItems="center">
                <Button variant="contained" fullWidth>
                  Select Data source
                </Button>
                <Stack direction="row" spacing={8} alignItems="center" justifyContent="center">
                  <Stack alignItems="center" spacing={1}>
                    <S3Icon sx={{ fontSize: 60 }} />
                    <Typography variant="body1" fontWeight="bold">S3</Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={1}>
                    <AzureBlobIcon sx={{ fontSize: 60 }} />
                    <Typography variant="body1" fontWeight="bold" textAlign="center"> Azure Blob Storage</Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={1}>
                    <JdbcIcon sx={{ fontSize: 60 }} />
                    <Typography variant="body1" fontWeight="bold">JDBC</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
}

export default DataSourceComponent;
