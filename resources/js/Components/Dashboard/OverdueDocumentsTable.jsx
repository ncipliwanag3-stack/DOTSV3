import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  CircularProgress,
  Box,
  Typography,
  Alert
} from '@mui/material';
import {
  Description as DocumentIcon,
  Warning as WarningIcon,
  CheckCircle as CompletedIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { format, formatDistanceToNow, isPast } from 'date-fns';

// Styles
const styles = {
  tableContainer: {
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  statusChip: {
    fontWeight: 500,
    fontSize: '0.75rem',
  },
  overdueChip: {
    backgroundColor: '#ff1744',
    color: 'white',
    fontWeight: 600,
    animation: 'pulse 2s infinite',
  },
  urgentChip: {
    backgroundColor: '#ff9100',
    color: 'white',
  },
  tableHeader: {
    backgroundColor: '#f5f7fa',
    fontWeight: 600,
  },
  documentIcon: {
    color: '#1976d2',
    marginRight: 1,
  },
  actionButton: {
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08)',
    },
  },
};

// Keyframes for pulse animation
const pulseAnimation = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const OverdueDocumentsTable = ({ 
  documents = [], 
  loading = false, 
  error = null,
  onViewDocument,
  onDownloadDocument,
  onMarkAsCompleted,
  title = "Overdue Documents",
  showPagination = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  emptyMessage = "No overdue documents found.",
  showUrgencyLevel = true
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortedDocuments, setSortedDocuments] = useState([]);

  // Sort documents by overdue severity (most overdue first)
  useEffect(() => {
    const sorted = [...documents].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
    setSortedDocuments(sorted);
  }, [documents]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDocumentTrackingNumber = (doc) => doc?.tracking_number || doc?.trackingNumber || 'N/A';

  const getDocumentTitle = (doc) => doc?.title || doc?.name || 'Untitled Document';

  const getLastTransaction = (doc) => doc?.last_transaction || doc?.lastTransaction || 'N/A';

  const getEffectiveDueDate = (doc) => {
    if (!doc) return null;
    return doc.dueDate || doc.due_date || doc.date_received || doc.updated_at || doc.created_at || null;
  };

  const getDaysOverdue = (dueDate) => {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getHoursOverdue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = now - due;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60)));
  };

  const getUrgencyLevel = (dueDate) => {
    const hoursOverdue = getHoursOverdue(dueDate);
    if (hoursOverdue > 72) return { label: 'Critical', color: '#d32f2f', severity: 'critical' };
    if (hoursOverdue > 24) return { label: 'High', color: '#f57c00', severity: 'high' };
    if (hoursOverdue > 0) return { label: 'Medium', color: '#f9a825', severity: 'medium' };
    return { label: 'Low', color: '#fdd835', severity: 'low' };
  };

  const getNormalizedStatus = (doc) => {
    const rawStatus = String(doc?.status || '').toLowerCase();
    const dueDate = getEffectiveDueDate(doc);
    const overdueHours = dueDate ? getHoursOverdue(dueDate) : 0;

    if (rawStatus === 'pending' && overdueHours > 24) {
      return 'overdue';
    }

    return rawStatus;
  };

  const getStatusChip = (status) => {
    const statusMap = {
      'overdue': { label: 'Overdue', color: 'error', icon: <WarningIcon fontSize="small" /> },
      'urgent': { label: 'Urgent', color: 'warning', icon: <ErrorIcon fontSize="small" /> },
      'completed': { label: 'Completed', color: 'success', icon: <CompletedIcon fontSize="small" /> },
      'pending': { label: 'Pending', color: 'info', icon: <ScheduleIcon fontSize="small" /> }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch {
      return 'Invalid Date';
    }
  };

  const renderDocumentIcon = (type) => {
    return <DocumentIcon sx={styles.documentIcon} />;
  };

  const handleViewDocument = (doc) => {
    if (onViewDocument) {
      onViewDocument(doc);
      return;
    }

    const search = [
      doc?.tracking_number,
      doc?.title,
      doc?.last_transaction,
    ].filter(Boolean).join(' ');

    const url = search
      ? `/documents?status=overdue&search=${encodeURIComponent(search)}`
      : '/documents?status=overdue';

    router.visit(url);
  };

  const handleDownloadDocument = (doc) => {
    if (onDownloadDocument) {
      onDownloadDocument(doc);
      return;
    }

    router.visit('/documents?status=overdue');
  };

  const handleMarkAsCompleted = (doc) => {
    if (onMarkAsCompleted) {
      onMarkAsCompleted(doc);
      return;
    }

    router.visit('/documents?status=overdue');
  };

  // Inject animation styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = pulseAnimation;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  // Empty state
  if (!sortedDocuments || sortedDocuments.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <DocumentIcon sx={{ fontSize: 48, color: '#bdbdbd', mb: 2 }} />
        <Typography variant="h6" color="textSecondary">
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          All documents are up to date!
        </Typography>
      </Paper>
    );
  }

  const paginatedDocuments = sortedDocuments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={styles.tableContainer}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" component="h2">
          {title}
          <Chip 
            label={`${sortedDocuments.length} overdue`} 
            color="error" 
            size="small" 
            sx={{ ml: 2 }} 
          />
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeader}>
              <TableCell>Tracking No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Last Transaction</TableCell>
              <TableCell>Days Overdue</TableCell>
              {showUrgencyLevel && <TableCell>Urgency</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.map((doc) => {
              const dueDate = getEffectiveDueDate(doc);
              const daysOverdue = getDaysOverdue(dueDate);
              const hoursOverdue = getHoursOverdue(dueDate);
              const urgency = getUrgencyLevel(dueDate);
              const normalizedStatus = getNormalizedStatus(doc);
              const status = getStatusChip(normalizedStatus || 'overdue');

              return (
                <TableRow 
                  key={doc.id} 
                  hover
                  onClick={() => handleViewDocument(doc)}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f8f9fa',
                      transition: 'background-color 0.3s ease',
                    },
                    backgroundColor: daysOverdue > 30 ? '#fff5f5' : 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {renderDocumentIcon(doc.type)}
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {getDocumentTrackingNumber(doc)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {normalizedStatus === 'overdue' ? 'Overdue' : (doc.status || 'Overdue')}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {getDocumentTitle(doc)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {getLastTransaction(doc)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={`${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue`}
                      size="small"
                      sx={{
                        ...styles.statusChip,
                        ...(daysOverdue > 30 ? styles.overdueChip : 
                           daysOverdue > 15 ? styles.urgentChip : 
                           { backgroundColor: '#ffeb3b', color: '#333' })
                      }}
                    />
                  </TableCell>
                  
                  {showUrgencyLevel && (
                    <TableCell>
                      <Chip
                        label={urgency.label}
                        size="small"
                        sx={{ 
                          backgroundColor: urgency.color,
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }}
                      />
                    </TableCell>
                  )}
                  
                  <TableCell>
                    <Chip
                      icon={status.icon}
                      label={status.label}
                      color={status.color}
                      size="small"
                      sx={styles.statusChip}
                    />
                  </TableCell>
                  
                  <TableCell align="center">
                    <Tooltip title="View Document">
                      <IconButton 
                        size="small" 
                        onClick={(event) => {
                          event.stopPropagation();
                          handleViewDocument(doc);
                        }}
                        sx={styles.actionButton}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Document">
                      <IconButton 
                        size="small" 
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDownloadDocument(doc);
                        }}
                        sx={styles.actionButton}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as Completed">
                      <IconButton 
                        size="small" 
                        onClick={(event) => {
                          event.stopPropagation();
                          handleMarkAsCompleted(doc);
                        }}
                        sx={{ 
                          ...styles.actionButton,
                          color: '#4caf50'
                        }}
                      >
                        <CompletedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={sortedDocuments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} of ${count} overdue documents`
          }
        />
      )}
    </Paper>
  );
};

export default OverdueDocumentsTable;