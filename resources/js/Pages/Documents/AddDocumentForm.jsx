// src/components/AddDocumentForm.jsx
import React, { useState } from 'react';
import './AddDocumentForm.css';

const AddDocumentForm = ({ onAddDocument }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call parent function with form data
    onAddDocument(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      file: null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-document-form">
      <h2>Add New Document</h2>
      
      <div className="form-group">
        <label>Document Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter document title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter document description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="contracts">Contracts</option>
          <option value="invoices">Invoices</option>
          <option value="reports">Reports</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Upload File *</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Document
      </button>
    </form>
  );
};

export default AddDocumentForm;