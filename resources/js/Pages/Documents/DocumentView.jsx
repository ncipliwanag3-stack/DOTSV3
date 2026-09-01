import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Import your document service/hook
// import { useDocument } from '../../hooks/useDocument';
// import { documentService } from '../../services/documentService';

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch document on mount
  useEffect(() => {
    fetchDocument();
  }, [id]);
  
  const fetchDocument = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with your actual API call
      // const response = await documentService.getDocument(id);
      // setDocument(response.data);
      
      // Mock data for demonstration
      setTimeout(() => {
        setDocument({
          id: id,
          title: 'Sample Document',
          type: 'PDF',
          size: '2.4 MB',
          uploadedBy: 'John Doe',
          uploadedAt: '2024-01-15T10:30:00Z',
          fullname: 'Sample Employee',
          division_code: 'ICTD',
          division: 'Information and Communications Technology Division',
          description: 'This is a sample document description.',
          tags: ['Important', 'Draft'],
          content: 'Document content would go here...',
          status: 'Active',
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to load document');
      setLoading(false);
    }
  };
  
  // Handlers
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading document:', document.id);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    // Implement share logic
    console.log('Sharing document:', document.id);
  };
  
  const handleEdit = () => {
    navigate(`/documents/${id}/edit`);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        // await documentService.deleteDocument(id);
        navigate('/documents');
      } catch (err) {
        setError(err.message || 'Failed to delete document');
      }
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={fetchDocument}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Container>
    );
  }
  
  // Document not found
  if (!document) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Document not found
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" flex={1}>
          {document.title}
        </Typography>
        <Box>
          <Tooltip title="Download">
            <IconButton onClick={handleDownload} color="primary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={handlePrint} color="primary">
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton onClick={handleShare} color="primary">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Document Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Type
            </Typography>
            <Typography variant="body1">
              {document.type}
            </Typography>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}><Typography variant="caption" color="textSecondary">Employee</Typography><Typography variant="body1">{document.fullname || 'Not assigned'}</Typography></Grid>
            <Grid item xs={12} sm={4}><Typography variant="caption" color="textSecondary">Division Code</Typography><Typography variant="body1">{document.division_code || 'Not specified'}</Typography></Grid>
            <Grid item xs={12} sm={4}><Typography variant="caption" color="textSecondary">Division</Typography><Typography variant="body1">{document.division || 'Not specified'}</Typography></Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Size
            </Typography>
            <Typography variant="body1">
              {document.size}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Uploaded By
            </Typography>
            <Typography variant="body1">
              {document.uploadedBy}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Uploaded At
            </Typography>
            <Typography variant="body1">
              {formatDate(document.uploadedAt)}
            </Typography>
          </Grid>
        </Grid>
        
        {document.tags && document.tags.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                Tags
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {document.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
        
        {document.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2">
              {document.description}
            </Typography>
          </>
        )}
        
        {document.status && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                Status
              </Typography>
              <Chip
                label={document.status}
                color={document.status === 'Active' ? 'success' : 'default'}
                size="small"
              />
            </Box>
          </>
        )}
      </Paper>
      
      {/* Document Content */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Content
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {document.content}
        </Typography>
      </Paper>
    </Container>
  );
};

// PropTypes
DocumentView.propTypes = {
  // Add any props if needed
};

export default DocumentView;