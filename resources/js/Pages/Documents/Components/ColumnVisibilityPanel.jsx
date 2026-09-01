export default function ColumnVisibilityPanel({ visibleColumns, setVisibleColumns }) {
    const columns = [
        { key: 'tracking', label: 'Tracking #' },
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type' },
        { key: 'originType', label: 'Origin Type' },
        { key: 'lastTransaction', label: 'Last Transaction' },
        { key: 'fullname', label: 'Employee' },
        { key: 'divisionCode', label: 'Division Code' },
        { key: 'division', label: 'Division' },
        { key: 'dateReceived', label: 'Date Received' },
        { key: 'status', label: 'Status' },
        { key: 'urgency', label: 'Urgency' },
        { key: 'actions', label: 'Actions' },
    ];

    const toggleColumn = (key) => {
        setVisibleColumns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="flex flex-wrap gap-4">
            <span className="text-sm font-medium text-gray-700">Toggle Columns:</span>
            {columns.map(column => (
                <label key={column.key} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={visibleColumns[column.key]}
                        onChange={() => toggleColumn(column.key)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{column.label}</span>
                </label>
            ))}
        </div>
    );
}