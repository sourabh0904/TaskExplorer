import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const TaskItem = ({ task, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.statusStrip, { backgroundColor: task.completed ? colors.success : colors.secondary }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
        <Text style={[styles.status, { color: task.completed ? colors.success : colors.secondary }]}>
          {task.completed ? 'COMPLETED' : 'INCOMPLETE'}
        </Text>
      </View>
      <View style={styles.chevron}>
         <Text style={{color: colors.secondary, fontSize: 18}}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  statusStrip: {
    width: 6,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  chevron: {
    paddingRight: 16,
  },
});

export default TaskItem;
