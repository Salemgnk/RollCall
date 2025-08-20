import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-navigation/elements";

const date = new Date();
const numberStudents = 46;
const presentStudents = 30;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>RollCall</Text>
      <Text style={styles.date}>Today's : {date.toDateString()}</Text>
      <Text style={styles.classic}>Number of Students: {numberStudents}</Text>
      <Text>Last stats</Text>
      <Text>Number of Presents Students: {presentStudents}</Text>
      <Text>Number of Absent Students: {numberStudents - presentStudents}</Text>
      <Button>Import List</Button>
      <Button>Launch presence</Button>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: 50,
      fontWeight: "bold",
      marginVertical: 16,
    },
    date: {
      fontSize: 24,
      marginVertical: 16,
    },
    classic : {

    }
  }
)
