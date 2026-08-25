import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Print as PrintIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Reports = () => {
  // State Management
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: 'last30',
    startDate: null,
    endDate: null,
    status: 'all'
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Report Types
  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'user', label: 'User Activity Report' },
    { value: 'financial', label: 'Financial Report' },
    { value: 'product', label: 'Product Performance Report' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'generated', label: 'Generated' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  // Mock Data
  const mockReports = [
    {
      id: 1,
      name: 'Monthly Sales Report - August 2026',
      type: 'sales',
      dateGenerated: '2026-08-18T10:30:00Z',
      status: 'generated',
      format: 'PDF',
      size: '2.4 MB',
      description: 'Monthly sales summary including revenue, orders, and top products'
    },
    {
      id: 2,
      name: 'Inventory Status Report',
      type: 'inventory',
      dateGenerated: '2026-08-17T14:20:00Z',
      status: 'generated',
      format: 'Excel',
      size: '5.1 MB',
      description: 'Current inventory levels, low stock items, and reorder recommendations'
    },
    {
      id: 3,
      name: 'User Engagement Report',
      type: 'user',
      dateGenerated: '2026-08-16T09:15:00Z',
      status: 'pending',
      format: 'PDF',
      size: '1.8 MB',
      description: 'User activity, new registrations, and engagement metrics'
    },
    {
      id: 4,
      name: 'Q3 Financial Summary',
      type: 'financial',
      dateGenerated: '2026-08-15T16:45:00Z',
      status: 'generated',
      format: 'PDF',
      size: '3.2 MB',
      description: 'Quarterly financial performance including revenue, expenses, and profit'
    },
    {
      id: 5,
      name: 'Product Performance Report',
      type: 'product',
      dateGenerated: '2026-08-14T11:00:00Z',
      status: 'failed',
      format: 'Excel',
      size: '0 KB',
      description: 'Product sales analysis and performance metrics'
    }
  ];

  // Fetch Reports
  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReports(mockReports);
    } catch (err) {
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter Reports
  const getFilteredReports = () => {
    let filtered = [...reports];

    if (filters.reportType !== 'all') {
      filtered = filtered.filter(report => report.type === filters.reportType);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    // Date filtering logic would go here

    return filtered;
  };

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateReport = () => {
    // Navigate to report generation or open modal
    console.log('Generate new report');
  };

  const handleDownload = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleView = (reportId) => {
    console.log('Viewing report:', reportId);
    setSelectedReport(reportId);
  };

  const handlePrint = (reportId) => {
    console.log('Printing report:', reportId);
  };

  const handleRefresh = () => {
    fetchReports();
  };

  // Format Date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get Status Color
  const getStatusColor = (status) => {
    const colors = {
      generated: 'success',
      pending: 'warning',
      failed: 'error'
    };
    return colors[status] || 'default';
  };

  // Get Report Type Icon
  const getReportTypeLabel = (type) => {
    const types = {
      sales: 'Sales',
      inventory: 'Inventory',
      user: 'User Activity',
      financial: 'Financial',
      product: 'Product Performance'
    };
    return types[type] || type;
  };

  const filteredReports = getFilteredReports();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="600">
          Reports
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
                label="Report Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                {reportTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                label="Status"
              >
                {statusOptions.map(status => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                label="Date Range"
              >
                {dateRanges.map(range => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FilterIcon />}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>

        {/* Custom Date Range */}
        {filters.dateRange === 'custom' && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={filters.startDate}
                  onChange={(date) => handleFilterChange('startDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={filters.endDate}
                  onChange={(date) => handleFilterChange('endDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        )}
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Reports Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date Generated</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Format</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No reports found. Try adjusting your filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {report.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {report.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getReportTypeLabel(report.type)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{formatDate(report.dateGenerated)}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          color={getStatusColor(report.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleView(report.id)}
                            title="View Report"
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDownload(report.id)}
                            title="Download Report"
                            disabled={report.status === 'failed'}
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handlePrint(report.id)}
                            title="Print Report"
                            disabled={report.status !== 'generated'}
                          >
                            <PrintIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Report Statistics */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              {reports.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Reports
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              {reports.filter(r => r.status === 'generated').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generated
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="warning.main">
              {reports.filter(r => r.status === 'pending').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="error.main">
              {reports.filter(r => r.status === 'failed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Failed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;