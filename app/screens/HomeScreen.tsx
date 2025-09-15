import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { studentStorage } from "../../utils/studentStorage";
import { CircularProgress } from "../components/CircularProgress";

export default function HomeScreen() {
  const date = new Date().toDateString();
  const totalStudents = studentStorage.getTotalCount();
  const presentStudents = Math.floor(totalStudents * 0.8); // Demo: 80% attendance rate
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RollCall</Text>
      <Text style={styles.date}>Today is : {date}</Text>
      <Text style={styles.studentCount}>Total Students: {totalStudents}</Text>

      <CircularProgress percentage={totalStudents > 0 ? (presentStudents / totalStudents) * 100 : 0} />

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.newPresence]} activeOpacity={0.7}>
          <MaterialIcons name="add-task" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>New Presence</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.history]} 
          activeOpacity={0.7}
          onPress={() => router.push('/history' as any)}
        >
          <MaterialIcons name="history" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: '#333' }]}>History</Text>
        </TouchableOpacity>
         <TouchableOpacity 
           style={[styles.button, styles.history]} 
           activeOpacity={0.7}
           onPress={() => router.push('/import-students' as any)}
         >
           <MaterialIcons name="upload-file" size={20} color="#333" style={{ marginRight: 8 }} />
           <Text style={[styles.buttonText, { color: '#333' }]}>Import Students List</Text>
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
    marginBottom: 8
  },
  studentCount: {
    fontSize: 14,
    color: '#3d99f5',
    fontWeight: '600',
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
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    gap: 12,
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row', // pour icône + texte côte à côte
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
