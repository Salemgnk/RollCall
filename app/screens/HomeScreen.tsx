import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const today = new Date().toLocaleDateString();

  const totalStudents = 3;
  const lastPresent = 3;
  const lastAbsent = 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RollCall</Text>
      <Text style={styles.date}>Today's Date: {today}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalStudents}</Text>
            <Text>Totals students</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>{lastPresent}</Text>
            <Text>Last Present</Text>
        </View>
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>{lastAbsent}</Text>
            <Text>Last Absent</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/screens/StudentSwipeScreen')}
      >
        <Text style={styles.buttonText}>New Presence</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.historyButton]}
        // onPress={() => router.push("/screens/HistoryScreen")}
      >
        <Text style={styles.buttonText}>Historique</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },
  date: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom:40
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "fff",
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 15
  },
  historyButton: {
    backgroundColor: "#E94E77"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  }
});
