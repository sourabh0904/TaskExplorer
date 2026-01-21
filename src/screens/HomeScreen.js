import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';
import { colors } from '../theme/colors';
import { useTasks } from '../context/TasksContext';

const HomeScreen = ({ navigation }) => {
  const { tasks, loading, error, loadTasks } = useTasks();
  const [filter, setFilter] = useState('All'); // All, Completed, Incomplete

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  const handleTaskPress = (task) => {
    navigation.navigate('Detail', { taskId: task.id });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadTasks} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['All', 'Completed', 'Incomplete'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={() => handleTaskPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16,
  },
  errorText: {
    marginBottom: 10,
    color: colors.error,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
