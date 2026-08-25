import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // or your preferred HTTP client

// Initial state
const initialState = {
  documents: [],
  currentDocument: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,
  totalDocuments: 0,
  currentPage: 1,
  pageSize: 10,
  filters: {
    search: '',
    category: '',
    status: '',
    dateRange: {
      start: null,
      end: null
    }
  },
  sortBy: 'createdAt',
  sortOrder: 'desc'
};

// Async thunks for API calls
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async ({ page = 1, limit = 10, filters = {}, sort = {} } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/documents', {
        params: {
          page,
          limit,
          ...filters,
          ...sort
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  'documents/fetchDocumentById',
  async (documentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async ({ documentId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/documents/${documentId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (documentId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/documents/${documentId}`);
      return documentId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadDocument = createAsyncThunk(
  'documents/downloadDocument',
  async (documentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      return { data: response.data, documentId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// The slice
const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    // Synchronous actions
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetDocumentState: () => initialState,
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.field;
      state.sortOrder = action.payload.order || 'asc';
    },
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
    updateDocumentLocally: (state, action) => {
      const index = state.documents.findIndex(
        doc => doc.id === action.payload.id
      );
      if (index !== -1) {
        state.documents[index] = { ...state.documents[index], ...action.payload };
      }
      if (state.currentDocument?.id === action.payload.id) {
        state.currentDocument = { ...state.currentDocument, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all documents
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload.documents || action.payload;
        state.totalDocuments = action.payload.total || action.payload.length || 0;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch documents';
      })
      
      // Fetch single document
      .addCase(fetchDocumentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDocument = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch document';
      })
      
      // Upload document
      .addCase(uploadDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadProgress = 100;
        state.documents.unshift(action.payload);
        state.totalDocuments += 1;
        // Reset progress after a short delay
        setTimeout(() => {
          state.uploadProgress = 0;
        }, 1000);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.uploadProgress = 0;
        state.error = action.payload || 'Failed to upload document';
      })
      
      // Update document
      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.documents.findIndex(
          doc => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        if (state.currentDocument?.id === action.payload.id) {
          state.currentDocument = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update document';
      })
      
      // Delete document
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = state.documents.filter(
          doc => doc.id !== action.payload
        );
        state.totalDocuments -= 1;
        if (state.currentDocument?.id === action.payload) {
          state.currentDocument = null;
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete document';
      })
      
      // Download document
      .addCase(downloadDocument.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(downloadDocument.fulfilled, (state) => {
        state.isLoading = false;
        // Handle download in component or with a separate utility
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to download document';
      });
  }
});

// Export actions
export const {
  setUploadProgress,
  clearError,
  resetDocumentState,
  setCurrentDocument,
  setFilters,
  clearFilters,
  setPage,
  setPageSize,
  setSort,
  clearCurrentDocument,
  updateDocumentLocally
} = documentSlice.actions;

// Selectors
export const selectAllDocuments = (state) => state.documents.documents;
export const selectCurrentDocument = (state) => state.documents.currentDocument;
export const selectIsLoading = (state) => state.documents.isLoading;
export const selectError = (state) => state.documents.error;
export const selectUploadProgress = (state) => state.documents.uploadProgress;
export const selectTotalDocuments = (state) => state.documents.totalDocuments;
export const selectCurrentPage = (state) => state.documents.currentPage;
export const selectPageSize = (state) => state.documents.pageSize;
export const selectFilters = (state) => state.documents.filters;
export const selectSort = (state) => ({
  field: state.documents.sortBy,
  order: state.documents.sortOrder
});
export const selectPagination = (state) => ({
  currentPage: state.documents.currentPage,
  pageSize: state.documents.pageSize,
  totalDocuments: state.documents.totalDocuments
});
export const selectDocumentStats = (state) => ({
  total: state.documents.totalDocuments,
  currentPage: state.documents.currentPage,
  pageSize: state.documents.pageSize,
  isLoading: state.documents.isLoading
});

export default documentSlice.reducer;