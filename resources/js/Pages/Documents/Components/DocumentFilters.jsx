import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

// DocumentFilters Component
// Handles filtering and search functionality for document list
const DocumentFilters = ({ filters = {}, onFilterChange, categories = [], tags = [] }) => {
    // Local state for filter visibility on mobile
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    // Form state for filters
    const { data, setData, get, reset, processing } = useForm({
        search: filters.search || '',
        origin_type: filters.origin_type || '',
        division_code: filters.division_code || '',
        division: filters.division || '',
        category: filters.category || '',
        tag: filters.tag || '',
        status: filters.status || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
        sort_by: filters.sort_by || 'created_at',
        sort_direction: filters.sort_direction || 'desc',
    });

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setData(key, value);
        
        // If onFilterChange prop is provided, use it for parent state management
        if (onFilterChange) {
            onFilterChange({ ...data, [key]: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If onFilterChange is provided, use it
        if (onFilterChange) {
            onFilterChange(data);
        } else {
            // Otherwise use Inertia GET request
            get(route('documents.index'), {
                preserveState: true,
                preserveScroll: true,
            });
        }
        
        // Close mobile filters on submit
        setShowMobileFilters(false);
    };

    // Handle reset filters
    const handleReset = () => {
        reset();
        
        const emptyFilters = {
            search: '',
            origin_type: '',
            division_code: '',
            division: '',
            category: '',
            tag: '',
            status: '',
            date_from: '',
            date_to: '',
            sort_by: 'created_at',
            sort_direction: 'desc',
        };
        
        if (onFilterChange) {
            onFilterChange(emptyFilters);
        } else {
            get(route('documents.index'), {
                preserveState: true,
                preserveScroll: true,
            });
        }
        
        setShowMobileFilters(false);
    };

    // Handle clear specific filter
    const clearFilter = (key) => {
        setData(key, '');
        handleFilterChange(key, '');
    };

    // Check if any filters are active
    const hasActiveFilters = () => {
        return data.search || data.origin_type || data.division_code || data.division || data.category || data.tag || data.status || 
               data.date_from || data.date_to || 
               data.sort_by !== 'created_at' || data.sort_direction !== 'desc';
    };

    // Get active filters count
    const getActiveFiltersCount = () => {
        let count = 0;
        if (data.search) count++;
        if (data.origin_type) count++;
        if (data.division_code) count++;
        if (data.division) count++;
        if (data.category) count++;
        if (data.tag) count++;
        if (data.status) count++;
        if (data.date_from) count++;
        if (data.date_to) count++;
        if (data.sort_by !== 'created_at') count++;
        if (data.sort_direction !== 'desc') count++;
        return count;
    };

    return (
        <div className="space-y-4">
            {/* Search Bar - Always Visible */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={data.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {data.search && (
                        <button
                            onClick={() => clearFilter('search')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                    >
                        <FunnelIcon className="h-5 w-5 mr-2" />
                        Filters
                        {getActiveFiltersCount() > 0 && (
                            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                                {getActiveFiltersCount()}
                            </span>
                        )}
                    </button>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {processing ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {/* Active Filters Chips */}
            {hasActiveFilters() && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {data.search && (
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            Search: {data.search}
                            <button
                                onClick={() => clearFilter('search')}
                                className="ml-2 hover:text-blue-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    {data.category && (
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Category: {data.category}
                            <button
                                onClick={() => clearFilter('category')}
                                className="ml-2 hover:text-green-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    {data.origin_type && (
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                            Origin: {data.origin_type}
                            <button onClick={() => clearFilter('origin_type')} className="ml-2 hover:text-indigo-600">
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    {data.tag && (
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                            Tag: {data.tag}
                            <button
                                onClick={() => clearFilter('tag')}
                                className="ml-2 hover:text-purple-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    {data.status && (
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                            Status: {data.status}
                            <button
                                onClick={() => clearFilter('status')}
                                className="ml-2 hover:text-yellow-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    {data.sort_by !== 'created_at' && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                            Sort: {data.sort_by} ({data.sort_direction})
                            <button
                                onClick={() => {
                                    setData('sort_by', 'created_at');
                                    setData('sort_direction', 'desc');
                                    handleFilterChange('sort_by', 'created_at');
                                }}
                                className="ml-2 hover:text-gray-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={handleReset}
                        className="text-sm text-red-600 hover:text-red-800"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Filter Panel - Mobile/Desktop */}
            {(showMobileFilters || true) && (
                <div className={`${showMobileFilters ? 'block' : 'hidden sm:block'} bg-white border border-gray-200 rounded-lg p-4`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Origin Type
                            </label>
                            <input
                                type="text"
                                value={data.origin_type}
                                onChange={(e) => handleFilterChange('origin_type', e.target.value)}
                                placeholder="Filter by origin type"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Division Code</label>
                            <input
                                type="text"
                                value={data.division_code}
                                onChange={(e) => handleFilterChange('division_code', e.target.value)}
                                placeholder="Filter by division code"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                            <input
                                type="text"
                                value={data.division}
                                onChange={(e) => handleFilterChange('division', e.target.value)}
                                placeholder="Filter by division"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tag Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tag
                            </label>
                            <select
                                value={data.tag}
                                onChange={(e) => handleFilterChange('tag', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Tags</option>
                                {tags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        {/* Date Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date From
                            </label>
                            <input
                                type="date"
                                value={data.date_from}
                                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date To
                            </label>
                            <input
                                type="date"
                                value={data.date_to}
                                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Sort Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sort By
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={data.sort_by}
                                    onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="created_at">Date Created</option>
                                    <option value="updated_at">Date Updated</option>
                                    <option value="title">Title</option>
                                    <option value="origin_type">Origin Type</option>
                                    <option value="last_transaction">Last Transaction</option>
                                    <option value="category">Category</option>
                                    <option value="status">Status</option>
                                </select>
                                <select
                                    value={data.sort_direction}
                                    onChange={(e) => handleFilterChange('sort_direction', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="asc">Asc</option>
                                    <option value="desc">Desc</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Reset All
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentFilters;