import React from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const students = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
];

export default function StudentListScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student List</Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                   <TouchableOpacity
                   style={styles.item}
                   onPress={() => router.push(`/screens/StudentDetailScreen?id=${item.id}&name=${encodeURIComponent(item.name)}`)}
                >
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
                )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 16,
    },
})
