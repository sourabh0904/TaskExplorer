import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const DetailScreen = ({ route }) => {
  const { task } = route.params;
  const [status, setStatus] = useState(task.completed);

  const toggleStatus = () => {
    setStatus(!status);
    // Note: Local state only for verify bonus req, persistence is separate
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
           <Text style={styles.title}>{task.title}</Text>
           <View style={[styles.badge, { backgroundColor: status ? colors.success + '20' : colors.secondary + '20' }]}>
             <Text style={[styles.badgeText, { color: status ? colors.success : colors.secondary }]}>
                {status ? 'COMPLETED' : 'INCOMPLETE'}
             </Text>
           </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.row}>
          <Text style={styles.label}>Task ID</Text>
          <Text style={styles.value}>#{task.id}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>User ID</Text>
          <Text style={styles.value}>{task.userId}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: status ? colors.secondary : colors.primary }]} 
        onPress={toggleStatus}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {status ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    lineHeight: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DetailScreen;
