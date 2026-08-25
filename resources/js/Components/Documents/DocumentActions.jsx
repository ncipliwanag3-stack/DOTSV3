import React from 'react';
import PropTypes from 'prop-types';
import {
  Download,
  Share2,
  Trash2,
  Edit,
  Copy,
  Eye,
  MoreVertical,
  FileText,
  Printer,
  Star,
  Archive,
} from 'lucide-react'; // or your preferred icon library

const DocumentActions = ({
  document,
  onDownload,
  onShare,
  onDelete,
  onEdit,
  onCopy,
  onPreview,
  onPrint,
  onToggleFavorite,
  onArchive,
  showLabels = false,
  variant = 'horizontal', // 'horizontal' | 'vertical' | 'dropdown'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabledActions = [],
  loading = false,
}) => {
  const isDisabled = (action) => disabledActions.includes(action) || loading;

  const buttonClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const iconClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const ActionButton = ({ onClick, icon: Icon, label, action, color = 'gray' }) => (
    <button
      onClick={() => onClick?.(document)}
      disabled={isDisabled(action)}
      className={`
        flex items-center gap-1.5 rounded-md
        ${buttonClasses[size]}
        ${color === 'gray' && 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        ${color === 'red' && 'text-red-600 hover:bg-red-50 hover:text-red-700'}
        ${color === 'blue' && 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'}
        ${color === 'green' && 'text-green-600 hover:bg-green-50 hover:text-green-700'}
        ${color === 'yellow' && 'text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700'}
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${showLabels ? 'px-2' : 'px-1'}
        ${className}
      `}
      aria-label={label}
      title={label}
    >
      <Icon className={iconClasses[size]} />
      {showLabels && <span>{label}</span>}
    </button>
  );

  const actions = [
    {
      key: 'preview',
      icon: Eye,
      label: 'Preview',
      onClick: onPreview,
      color: 'blue',
    },
    {
      key: 'edit',
      icon: Edit,
      label: 'Edit',
      onClick: onEdit,
      color: 'blue',
    },
    {
      key: 'download',
      icon: Download,
      label: 'Download',
      onClick: onDownload,
      color: 'gray',
    },
    {
      key: 'share',
      icon: Share2,
      label: 'Share',
      onClick: onShare,
      color: 'green',
    },
    {
      key: 'copy',
      icon: Copy,
      label: 'Copy',
      onClick: onCopy,
      color: 'gray',
    },
    {
      key: 'print',
      icon: Printer,
      label: 'Print',
      onClick: onPrint,
      color: 'gray',
    },
    {
      key: 'favorite',
      icon: Star,
      label: document?.isFavorite ? 'Remove Favorite' : 'Add Favorite',
      onClick: onToggleFavorite,
      color: document?.isFavorite ? 'yellow' : 'gray',
    },
    {
      key: 'archive',
      icon: Archive,
      label: document?.isArchived ? 'Unarchive' : 'Archive',
      onClick: onArchive,
      color: 'gray',
    },
    {
      key: 'delete',
      icon: Trash2,
      label: 'Delete',
      onClick: onDelete,
      color: 'red',
    },
  ];

  const visibleActions = actions.filter(
    (action) => action.onClick && !disabledActions.includes(action.key)
  );

  if (visibleActions.length === 0) {
    return null;
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    const primaryActions = visibleActions.slice(0, 2);
    const dropdownActions = visibleActions.slice(2);

    return (
      <div className="flex items-center gap-1">
        {primaryActions.map((action) => (
          <ActionButton key={action.key} {...action} />
        ))}
        {dropdownActions.length > 0 && (
          <div className="relative group">
            <button
              className={`
                flex items-center justify-center rounded-md
                ${buttonClasses[size]}
                text-gray-600 hover:bg-gray-100 hover:text-gray-900
                transition-colors duration-200
                ${showLabels ? 'px-2' : 'px-1'}
                ${className}
              `}
              aria-label="More actions"
              disabled={loading}
            >
              <MoreVertical className={iconClasses[size]} />
              {showLabels && <span>More</span>}
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10 hidden group-hover:block">
              {dropdownActions.map((action) => (
                <button
                  key={action.key}
                  onClick={() => action.onClick?.(document)}
                  disabled={isDisabled(action.key)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm
                    ${action.color === 'red' && 'text-red-600 hover:bg-red-50'}
                    ${action.color === 'blue' && 'text-blue-600 hover:bg-blue-50'}
                    ${action.color === 'green' && 'text-green-600 hover:bg-green-50'}
                    ${action.color === 'yellow' && 'text-yellow-600 hover:bg-yellow-50'}
                    ${action.color === 'gray' && 'text-gray-700 hover:bg-gray-50'}
                    transition-colors duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vertical variant
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {visibleActions.map((action) => (
          <ActionButton key={action.key} {...action} />
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {visibleActions.map((action) => (
        <ActionButton key={action.key} {...action} />
      ))}
    </div>
  );
};

DocumentActions.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isFavorite: PropTypes.bool,
    isArchived: PropTypes.bool,
    // Add other document properties as needed
  }),
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onCopy: PropTypes.func,
  onPreview: PropTypes.func,
  onPrint: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  onArchive: PropTypes.func,
  showLabels: PropTypes.bool,
  variant: PropTypes.oneOf(['horizontal', 'vertical', 'dropdown']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabledActions: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

DocumentActions.defaultProps = {
  document: {},
  onDownload: null,
  onShare: null,
  onDelete: null,
  onEdit: null,
  onCopy: null,
  onPreview: null,
  onPrint: null,
  onToggleFavorite: null,
  onArchive: null,
  showLabels: false,
  variant: 'horizontal',
  size: 'md',
  className: '',
  disabledActions: [],
  loading: false,
};

export default DocumentActions;