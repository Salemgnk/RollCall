import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function StudentListScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student List</Text>
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
  },
})
