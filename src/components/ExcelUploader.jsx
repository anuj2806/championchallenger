import { useState, useRef } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ExcelUploader = ({file,setFile}) => {
 
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef();
  const theme = useTheme();
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
    } else {
      alert("Please upload an Excel file (.xlsx)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".xlsx")) {
      setFile(droppedFile);
    } else {
      alert("Please upload an Excel file (.xlsx)");
    }
  };

  const handleUpload = (e) => {
    e.stopPropagation(); // ✅ Prevent triggering file input click
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetFile = (e) => {
    e.stopPropagation(); // ✅ Prevent triggering file input click
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <Grid container sx={{padding:"0px 10px"}}>
      <Grid size={{xs:12}}>   
        <Box
          onClick={() => {
            if (!file) inputRef.current.click(); // ✅ Only open if no file
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          sx={{
            border: `1px dashed ${theme.palette.primary.main}`,
            borderRadius: 2,
            textAlign: "center",
            p: 2, 
            cursor: "pointer",
            "&:hover": { bgcolor: theme.palette.background.paper}, 
          }}
        >
          {!file ? (
            <>
              <CloudUploadIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6">Drag & Drop Excel File Here</Typography>
              <Typography variant="body2" color="textSecondary">
                or click to select (.xlsx)
              </Typography>
            </>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {file.name}
              </Typography>
              {!isUploading ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  startIcon={<CheckCircleIcon />}
                  sx={{ mr: 1 }}
                >
                  Upload
                </Button>
              ) : (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Uploading... {uploadProgress}%
                  </Typography>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                </Box>
              )}
              <IconButton color="error" onClick={resetFile} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept=".xlsx"
          onChange={handleFileSelect}
        />
      </Grid>
    </Grid>
  );
};

export default ExcelUploader;
