import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const DocumentContext = createContext();

// Custom hook to use the document context
export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};

// Provider component
export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all documents
  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your API call
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single document by ID
  const fetchDocumentById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/documents/${id}`);
      const data = await response.json();
      setCurrentDocument(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new document
  const createDocument = async (documentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });
      const data = await response.json();
      setDocuments([...documents, data]);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing document
  const updateDocument = async (id, documentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });
      const data = await response.json();
      setDocuments(documents.map(doc => doc.id === id ? data : doc));
      if (currentDocument?.id === id) {
        setCurrentDocument(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      setDocuments(documents.filter(doc => doc.id !== id));
      if (currentDocument?.id === id) {
        setCurrentDocument(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Load documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const value = {
    documents,
    currentDocument,
    loading,
    error,
    fetchDocuments,
    fetchDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
    clearError,
    setCurrentDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentContext;