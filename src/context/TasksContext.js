import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTasks } from '../api/tasks';

const TASKS_STORAGE_KEY = '@tasks_data';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch from API
      const data = await fetchTasks();
      setTasks(data);
      // Persist to storage
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.log('Network failed, trying local storage...');
      // If API fails, try to load from storage
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
          setError(null); // Clear error if we have cached data
        } else {
          setError('Failed to fetch tasks and no local data');
        }
      } catch (storageErr) {
        setError('Failed to fetch tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTaskStatus = async (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Persist changes
    try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (e) {
        console.error("Failed to persist task update", e);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, loading, error, loadTasks, toggleTaskStatus }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
