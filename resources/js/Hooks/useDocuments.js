import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing document collections with CRUD operations
 * @param {Object} options - Configuration options
 * @param {Array} options.initialDocuments - Initial document array
 * @param {Function} options.fetchDocuments - Async function to fetch documents
 * @param {Function} options.createDocument - Async function to create a document
 * @param {Function} options.updateDocument - Async function to update a document
 * @param {Function} options.deleteDocument - Async function to delete a document
 * @param {boolean} options.autoFetch - Automatically fetch documents on mount
 * @param {number} options.pollingInterval - Polling interval in ms (0 = disabled)
 * @returns {Object} Document management state and functions
 */
const useDocuments = ({
  initialDocuments = [],
  fetchDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  autoFetch = true,
  pollingInterval = 0,
} = {}) => {
  // State
  const [documents, setDocuments] = useState(initialDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Memoized filtered and sorted documents
  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(doc => 
        doc.title?.toLowerCase().includes(term) ||
        doc.name?.toLowerCase().includes(term) ||
        doc.description?.toLowerCase().includes(term) ||
        doc.content?.toLowerCase().includes(term)
      );
    }

    // Apply custom filter
    if (filter) {
      result = result.filter(filter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [documents, searchTerm, filter, sortConfig]);

  // Fetch documents
  const fetchDocs = useCallback(async (params = {}) => {
    if (!fetchDocuments) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchDocuments(params);
      setDocuments(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch documents');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDocuments]);

  // Create document
  const create = useCallback(async (documentData) => {
    if (!createDocument) return;

    setIsCreating(true);
    setError(null);

    try {
      const newDocument = await createDocument(documentData);
      setDocuments(prev => [newDocument, ...prev]);
      return newDocument;
    } catch (err) {
      setError(err.message || 'Failed to create document');
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, [createDocument]);

  // Update document
  const update = useCallback(async (id, documentData) => {
    if (!updateDocument) return;

    setIsUpdating(true);
    setError(null);

    try {
      const updatedDocument = await updateDocument(id, documentData);
      setDocuments(prev => 
        prev.map(doc => doc.id === id ? updatedDocument : doc)
      );
      
      // Update selected document if it was the one updated
      if (selectedDocument?.id === id) {
        setSelectedDocument(updatedDocument);
      }
      
      return updatedDocument;
    } catch (err) {
      setError(err.message || 'Failed to update document');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, [updateDocument, selectedDocument]);

  // Delete document
  const remove = useCallback(async (id) => {
    if (!deleteDocument) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      
      // Clear selected document if it was deleted
      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete document');
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [deleteDocument, selectedDocument]);

  // Select document
  const select = useCallback((document) => {
    setSelectedDocument(document);
  }, []);

  // Clear selected document
  const clearSelection = useCallback(() => {
    setSelectedDocument(null);
  }, []);

  // Set search term
  const setSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Set filter
  const setFilterFn = useCallback((filterFn) => {
    setFilter(() => filterFn);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilter(null);
  }, []);

  // Sort documents
  const sort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && fetchDocuments) {
      fetchDocs();
    }
  }, [autoFetch, fetchDocuments, fetchDocs]);

  // Polling
  useEffect(() => {
    if (!pollingInterval || pollingInterval <= 0 || !fetchDocuments) return;

    const intervalId = setInterval(() => {
      fetchDocs();
    }, pollingInterval);

    return () => clearInterval(intervalId);
  }, [pollingInterval, fetchDocuments, fetchDocs]);

  // Reset state
  const reset = useCallback(() => {
    setDocuments(initialDocuments);
    setError(null);
    setSelectedDocument(null);
    setSearchTerm('');
    setFilter(null);
    setSortConfig({ key: null, direction: 'asc' });
  }, [initialDocuments]);

  return {
    // State
    documents: filteredDocuments,
    allDocuments: documents,
    loading,
    error,
    isCreating,
    isUpdating,
    isDeleting,
    selectedDocument,
    searchTerm,
    filter,
    sortConfig,
    
    // Actions
    fetchDocuments: fetchDocs,
    createDocument: create,
    updateDocument: update,
    deleteDocument: remove,
    selectDocument: select,
    clearSelection,
    setSearch,
    setFilter: setFilterFn,
    clearFilters,
    sort,
    reset,
    
    // Computed
    totalDocuments: documents.length,
    filteredCount: filteredDocuments.length,
    isEmpty: filteredDocuments.length === 0,
    isFiltered: searchTerm !== '' || filter !== null,
  };
};

export default useDocuments;