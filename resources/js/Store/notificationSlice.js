// js/Store/notificationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  currentNotification: null,
  filters: {
    type: 'all', // 'all', 'info', 'success', 'warning', 'error'
    read: 'all', // 'all', 'read', 'unread'
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
};

// Async thunks for API calls
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async ({ page = 1, limit = 20, filters = {} }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      });
      
      const response = await fetch(`/api/notifications?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNotification = createAsyncThunk(
  'notifications/addNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add notification');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
      
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// The slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Sync actions
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset pagination when filter changes
      state.pagination.page = 1;
    },
    
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    resetNotifications: (state) => {
      return initialState;
    },
    
    addLocalNotification: (state, action) => {
      const newNotification = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    
    removeLocalNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount -= 1;
        }
        state.notifications.splice(index, 1);
      }
    },
    
    toggleReadStatus: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = !notification.read;
        state.unreadCount = notification.read
          ? state.unreadCount - 1
          : state.unreadCount + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.data || action.payload.notifications || [];
        state.unreadCount = action.payload.unreadCount || 0;
        state.pagination = {
          ...state.pagination,
          total: action.payload.total || 0,
          totalPages: action.payload.totalPages || 0,
        };
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Mark as read
      .addCase(markAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.notifications.findIndex(
          (n) => n.id === action.payload.id
        );
        if (index !== -1) {
          if (!state.notifications[index].read) {
            state.unreadCount -= 1;
          }
          state.notifications[index].read = true;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Mark all as read
      .addCase(markAllAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.isLoading = false;
        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true,
        }));
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      
      // Add notification
      .addCase(addNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
        state.unreadCount += 1;
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n.id === action.payload
        );
        if (index !== -1) {
          const notification = state.notifications[index];
          if (!notification.read) {
            state.unreadCount -= 1;
          }
          state.notifications.splice(index, 1);
        }
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions
export const {
  setFilter,
  setPage,
  clearError,
  resetNotifications,
  addLocalNotification,
  removeLocalNotification,
  toggleReadStatus,
} = notificationSlice.actions;

// Export selectors
export const selectAllNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectIsLoading = (state) => state.notifications.isLoading;
export const selectError = (state) => state.notifications.error;
export const selectFilters = (state) => state.notifications.filters;
export const selectPagination = (state) => state.notifications.pagination;
export const selectFilteredNotifications = (state) => {
  const { notifications, filters } = state.notifications;
  
  return notifications.filter((notification) => {
    // Filter by type
    if (filters.type !== 'all' && notification.type !== filters.type) {
      return false;
    }
    
    // Filter by read status
    if (filters.read === 'read' && !notification.read) {
      return false;
    }
    if (filters.read === 'unread' && notification.read) {
      return false;
    }
    
    return true;
  });
};

// Export the reducer as default
export default notificationSlice.reducer;