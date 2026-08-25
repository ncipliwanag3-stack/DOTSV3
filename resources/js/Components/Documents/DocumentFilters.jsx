import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Grid,
  IconButton,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Divider,
  Autocomplete,
  InputAdornment
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  ExpandMore,
  ExpandLess,
  DateRange,
  AttachFile,
  Folder,
  Person,
  Label
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// PropTypes for the component
const propTypes = {
  /** Array of filter configurations */
  filters: PropTypes.shape({
    search: PropTypes.string,
    documentType: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.arrayOf(PropTypes.string),
    dateRange: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
    uploadDate: PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date)
    }),
    fileSize: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  }),
  /** Callback when filters change */
  onFilterChange: PropTypes.func.isRequired,
  /** Available options for document types */
  documentTypes: PropTypes.arrayOf(PropTypes.string),
  /** Available options for statuses */
  statuses: PropTypes.arrayOf(PropTypes.string),
  /** Available options for categories */
  categories: PropTypes.arrayOf(PropTypes.string),
  /** Available tags */
  availableTags: PropTypes.arrayOf(PropTypes.string),
  /** Whether filters should be expanded by default */
  defaultExpanded: PropTypes.bool,
  /** Whether to show advanced filters */
  showAdvanced: PropTypes.bool,
  /** Placeholder text for search */
  searchPlaceholder: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Style overrides */
  style: PropTypes.object
};

const defaultProps = {
  filters: {
    search: '',
    documentType: [],
    status: [],
    dateRange: { start: null, end: null },
    tags: [],
    categories: [],
    uploadDate: { from: null, to: null },
    fileSize: { min: 0, max: 100 }
  },
  documentTypes: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'Image', 'Other'],
  statuses: ['Draft', 'Pending', 'Approved', 'Rejected', 'Archived'],
  categories: ['Financial', 'Legal', 'HR', 'Technical', 'Marketing'],
  availableTags: ['Urgent', 'Confidential', 'Draft', 'Final', 'Review'],
  defaultExpanded: false,
  showAdvanced: false,
  searchPlaceholder: 'Search documents...',
  className: '',
  style: {}
};

const DocumentFilters = ({
  filters: initialFilters,
  onFilterChange,
  documentTypes,
  statuses,
  categories,
  availableTags,
  defaultExpanded,
  showAdvanced,
  searchPlaceholder,
  className,
  style
}) => {
  // State
  const [filters, setFilters] = useState(initialFilters);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced);

  // Update local state when props change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Handlers
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    handleFilterChange('search', value);
  };

  const handleDateRangeChange = (type, date) => {
    const currentRange = filters.dateRange || { start: null, end: null };
    const updatedRange = { ...currentRange, [type]: date };
    handleFilterChange('dateRange', updatedRange);
  };

  const handleFileSizeChange = (event, newValue) => {
    handleFilterChange('fileSize', { min: newValue[0], max: newValue[1] });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      documentType: [],
      status: [],
      dateRange: { start: null, end: null },
      tags: [],
      categories: [],
      uploadDate: { from: null, to: null },
      fileSize: { min: 0, max: 100 }
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.documentType?.length > 0) count += filters.documentType.length;
    if (filters.status?.length > 0) count += filters.status.length;
    if (filters.dateRange?.start || filters.dateRange?.end) count++;
    if (filters.tags?.length > 0) count += filters.tags.length;
    if (filters.categories?.length > 0) count += filters.categories.length;
    if (filters.uploadDate?.from || filters.uploadDate?.to) count++;
    if (filters.fileSize?.min > 0 || filters.fileSize?.max < 100) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Box className={className} style={style}>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        {/* Search and Quick Filters */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder={searchPlaceholder}
              value={filters.search || ''}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: filters.search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => handleFilterChange('search', '')}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                onClick={toggleExpanded}
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              >
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>

              {activeFilterCount > 0 && (
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Clear />}
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              )}

              {showAdvancedFilters && (
                <Button
                  variant="text"
                  size="small"
                  onClick={toggleAdvancedFilters}
                >
                  {showAdvancedFilters ? 'Hide Advanced' : 'Show Advanced'}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {filters.documentType?.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                onDelete={() => {
                  const newTypes = filters.documentType.filter(t => t !== type);
                  handleFilterChange('documentType', newTypes);
                }}
                icon={<AttachFile />}
              />
            ))}
            
            {filters.status?.map((status) => (
              <Chip
                key={status}
                label={status}
                size="small"
                onDelete={() => {
                  const newStatuses = filters.status.filter(s => s !== status);
                  handleFilterChange('status', newStatuses);
                }}
                color={status === 'Approved' ? 'success' : 
                       status === 'Rejected' ? 'error' : 
                       status === 'Draft' ? 'warning' : 'default'}
              />
            ))}

            {filters.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => {
                  const newTags = filters.tags.filter(t => t !== tag);
                  handleFilterChange('tags', newTags);
                }}
                icon={<Label />}
                variant="outlined"
              />
            ))}

            {filters.categories?.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                onDelete={() => {
                  const newCategories = filters.categories.filter(c => c !== category);
                  handleFilterChange('categories', newCategories);
                }}
                icon={<Folder />}
              />
            ))}

            {(filters.dateRange?.start || filters.dateRange?.end) && (
              <Chip
                label={`Date: ${filters.dateRange.start?.toLocaleDateString() || '...'} - ${filters.dateRange.end?.toLocaleDateString() || '...'}`}
                size="small"
                onDelete={() => handleFilterChange('dateRange', { start: null, end: null })}
                icon={<DateRange />}
              />
            )}
          </Box>
        )}

        {/* Expanded Filters Section */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            {/* Document Type */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Document Type</InputLabel>
                <Select
                  multiple
                  value={filters.documentType || []}
                  onChange={(e) => handleFilterChange('documentType', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {documentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={(filters.documentType || []).includes(type)} />
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={filters.status || []}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={(filters.status || []).includes(status)} />
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Categories */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  multiple
                  value={filters.categories || []}
                  onChange={(e) => handleFilterChange('categories', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={(filters.categories || []).includes(category)} />
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Range */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="From"
                      value={filters.dateRange?.start || null}
                      onChange={(date) => handleDateRangeChange('start', date)}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      label="To"
                      value={filters.dateRange?.end || null}
                      onChange={(date) => handleDateRangeChange('end', date)}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Grid>

            {/* Tags */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                size="small"
                options={availableTags}
                value={filters.tags || []}
                onChange={(event, newValue) => handleFilterChange('tags', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Add tags..."
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          <Collapse in={showAdvancedFilters} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              {/* Upload Date Range */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Uploaded From"
                        value={filters.uploadDate?.from || null}
                        onChange={(date) => {
                          const updated = { ...filters.uploadDate, from: date };
                          handleFilterChange('uploadDate', updated);
                        }}
                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Uploaded To"
                        value={filters.uploadDate?.to || null}
                        onChange={(date) => {
                          const updated = { ...filters.uploadDate, to: date };
                          handleFilterChange('uploadDate', updated);
                        }}
                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </Grid>

              {/* File Size Range */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    File Size (MB)
                  </Typography>
                  <Slider
                    value={[
                      filters.fileSize?.min || 0,
                      filters.fileSize?.max || 100
                    ]}
                    onChange={handleFileSizeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    marks={[
                      { value: 0, label: '0 MB' },
                      { value: 50, label: '50 MB' },
                      { value: 100, label: '100 MB' }
                    ]}
                  />
                </Box>
              </Grid>

              {/* Additional Advanced Filters */}
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.includeArchived || false}
                        onChange={(e) => handleFilterChange('includeArchived', e.target.checked)}
                      />
                    }
                    label="Include Archived Documents"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.onlyStarred || false}
                        onChange={(e) => handleFilterChange('onlyStarred', e.target.checked)}
                      />
                    }
                    label="Only Starred"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.showDeleted || false}
                        onChange={(e) => handleFilterChange('showDeleted', e.target.checked)}
                      />
                    }
                    label="Show Deleted"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Collapse>

          {/* Filter Actions */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear All
            </Button>
            <Button 
              variant="contained" 
              onClick={() => onFilterChange(filters)}
            >
              Apply Filters
            </Button>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

DocumentFilters.propTypes = propTypes;
DocumentFilters.defaultProps = defaultProps;

export default DocumentFilters;