import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function StudentDetailScreen() {
    const { id, name } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text>Student Detail</Text>
            <Text>ID: {id}</Text>
            <Text>Name: {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});