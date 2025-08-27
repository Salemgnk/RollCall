import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-navigation/elements";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CircularProgress } from "../components/CircularProgress";

export default function HomeScreen() {
  const date = new Date().toDateString();
  const totalStudents = 46;
  const presentStudents = 30;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RollCall</Text>
      <Text style={styles.date}>Today is : {date}</Text>

      {/* <View style={styles.statsContainer}>
        <View style={[styles.card, { borderLeftColor: '#3b82f6' }]}>
          <Text style={styles.cardTitle}>Total Students</Text>
          <Text style={styles.cardNumber}>{totalStudents}</Text>
        </View>
        <View style={[styles.card, { borderLeftColor: '#10b981' }]}>
          <Text style={styles.cardTitle}>Present Students</Text>
          <Text style={styles.cardNumber}>{presentStudents}</Text>
        </View>
        <View style={[styles.card, { borderLeftColor: '#ef4444' }]}>
          <Text style={styles.cardTitle}>Absent Students</Text>
          <Text style={styles.cardNumber}>{totalStudents - presentStudents}</Text>
        </View>
      </View> */}
      <CircularProgress percentage={(presentStudents / totalStudents) * 100} />

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.newPresence]} activeOpacity={0.7}>
          <MaterialIcons name="add-task" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>New Presence</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.history]} activeOpacity={0.7}>
          <MaterialIcons name="history" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: '#333' }]}>History</Text>
        </TouchableOpacity>
      </View>

    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#f8fafc'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20
  },
  statsContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 12
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 100,
    paddingHorizontal: 16,
    gap: 12, // si gap non supporté, utilise marginBottom sur chaque bouton
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row', // pour icône + texte côte à côte
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  newPresence: {
    backgroundColor: '#3d99f5',
  },
  history: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
