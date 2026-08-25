// hooks/useNotifications.js
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing notifications
 * @param {Object} options - Configuration options
 * @param {number} options.maxNotifications - Maximum number of notifications to store (default: 50)
 * @param {number} options.autoDismissTime - Auto dismiss time in ms (default: 5000)
 * @param {boolean} options.enableSound - Enable sound for new notifications (default: false)
 * @param {string} options.position - Notification position (default: 'top-right')
 * @returns {Object} Notification management functions and state
 */
const useNotifications = (options = {}) => {
  const {
    maxNotifications = 50,
    autoDismissTime = 5000,
    enableSound = false,
    position = 'top-right',
  } = options;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const timersRef = useRef(new Map());

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      type: notification.type || 'info', // 'success', 'error', 'warning', 'info'
      title: notification.title || '',
      message: notification.message || '',
      duration: notification.duration || autoDismissTime,
      read: false,
      timestamp: new Date(),
      ...notification,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    setUnreadCount((prev) => prev + 1);

    // Play sound if enabled
    if (enableSound) {
      playNotificationSound(newNotification.type);
    }

    // Auto dismiss
    if (newNotification.duration > 0) {
      const timerId = setTimeout(() => {
        removeNotification(newNotification.id);
      }, newNotification.duration);

      timersRef.current.set(newNotification.id, timerId);
    }

    return newNotification.id;
  }, [autoDismissTime, enableSound, maxNotifications]);

  // Remove a specific notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => {
      const notification = prev.find(n => n.id === id);
      if (notification && !notification.read) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
      return prev.filter(n => n.id !== id);
    });

    // Clear timer
    if (timersRef.current.has(id)) {
      clearTimeout(timersRef.current.get(id));
      timersRef.current.delete(id);
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map(n =>
        n.id === id && !n.read
          ? { ...n, read: true }
          : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
    // Clear all timers
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback((type) => {
    // Simple audio context beep (no external files needed)
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = type === 'error' ? 200 : 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, []);

  // Get notifications by type
  const getByType = useCallback((type) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  // Get unread notifications
  const getUnread = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  // Get notification statistics
  const getStats = useCallback(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const read = total - unread;
    const byType = notifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {});
    
    return { total, unread, read, byType };
  }, [notifications]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  // Convenience methods for different notification types
  const success = useCallback((message, options = {}) => {
    return addNotification({ type: 'success', message, ...options });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ type: 'error', message, ...options });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({ type: 'warning', message, ...options });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ type: 'info', message, ...options });
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    getByType,
    getUnread,
    getStats,
    success,
    error,
    warning,
    info,
    position,
  };
};

export default useNotifications;