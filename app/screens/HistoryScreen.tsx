import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AttendanceSession } from "../../types";
import SessionDetailScreen from "./SessionDetailScreen";

// Mock data for demonstration
const mockSessions: AttendanceSession[] = [
    {
        id: '1',
        date: new Date('2024-01-15'),
        records: [],
        totalStudents: 46,
        presentCount: 42
    },
    {
        id: '2',
        date: new Date('2024-01-14'),
        records: [],
        totalStudents: 46,
        presentCount: 38
    },
    {
        id: '3',
        date: new Date('2024-01-13'),
        records: [],
        totalStudents: 46,
        presentCount: 45
    },
    {
        id: '4',
        date: new Date('2024-01-12'),
        records: [],
        totalStudents: 46,
        presentCount: 40
    },
    {
        id: '5',
        date: new Date('2024-01-11'),
        records: [],
        totalStudents: 46,
        presentCount: 35
    }
];

interface HistoryItemProps {
    session: AttendanceSession;
    onPress: (session: AttendanceSession) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ session, onPress }) => {
    const absentCount = session.totalStudents - session.presentCount;
    const dateString = session.date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <TouchableOpacity 
            style={styles.historyItem} 
            onPress={() => onPress(session)}
            activeOpacity={0.7}
        >
            <View style={styles.dateContainer}>
                <MaterialIcons name="event" size={20} color="#666" />
                <Text style={styles.dateText}>{dateString}</Text>
            </View>
            
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <View style={[styles.statIndicator, { backgroundColor: '#4CAF50' }]} />
                    <Text style={styles.statLabel}>Present</Text>
                    <Text style={[styles.statValue, { color: '#4CAF50' }]}>{session.presentCount}</Text>
                </View>
                
                <View style={styles.statItem}>
                    <View style={[styles.statIndicator, { backgroundColor: '#F44336' }]} />
                    <Text style={styles.statLabel}>Absent</Text>
                    <Text style={[styles.statValue, { color: '#F44336' }]}>{absentCount}</Text>
                </View>
            </View>
            
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
    );
};

export default function HistoryScreen() {
    const [selectedSession, setSelectedSession] = useState<AttendanceSession | null>(null);

    const handleSessionPress = (session: AttendanceSession) => {
        setSelectedSession(session);
    };

    const handleBackToHistory = () => {
        setSelectedSession(null);
    };

    const renderHistoryItem = ({ item }: { item: AttendanceSession }) => (
        <HistoryItem session={item} onPress={handleSessionPress} />
    );

    // Show session detail screen if a session is selected
    if (selectedSession) {
        return (
            <SessionDetailScreen 
                session={selectedSession} 
                onBack={handleBackToHistory} 
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Attendance History</Text>
                    <Text style={styles.subtitle}>Tap on a session to view details</Text>
                </View>
                <View style={styles.placeholder} />
            </View>
            
            <FlatList
                data={mockSessions}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0'
    },
    backButton: {
        padding: 8
    },
    headerContent: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: 4
    },
    subtitle: {
        fontSize: 14,
        color: '#718096'
    },
    placeholder: {
        width: 40
    },
    listContainer: {
        padding: 16
    },
    historyItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginLeft: 8
    },
    statsContainer: {
        flexDirection: 'row',
        marginRight: 16,
        gap: 16
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    statIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4
    },
    statLabel: {
        fontSize: 12,
        color: '#718096',
        marginRight: 4
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})