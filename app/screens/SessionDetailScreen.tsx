import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AttendanceSession } from "../../types";

interface SessionDetailScreenProps {
    session: AttendanceSession;
    onBack: () => void;
}

export default function SessionDetailScreen({ session, onBack }: SessionDetailScreenProps) {
    const absentCount = session.totalStudents - session.presentCount;
    const attendanceRate = ((session.presentCount / session.totalStudents) * 100).toFixed(1);
    
    const dateString = session.date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const timeString = session.date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Session Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Session Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.dateSection}>
                        <MaterialIcons name="event" size={24} color="#3d99f5" />
                        <View style={styles.dateInfo}>
                            <Text style={styles.dateText}>{dateString}</Text>
                            <Text style={styles.timeText}>{timeString}</Text>
                        </View>
                    </View>
                </View>

                {/* Statistics Cards */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
                        <View style={styles.statHeader}>
                            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                            <Text style={[styles.statTitle, { color: '#4CAF50' }]}>Present</Text>
                        </View>
                        <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{session.presentCount}</Text>
                        <Text style={styles.statSubtext}>students</Text>
                    </View>

                    <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
                        <View style={styles.statHeader}>
                            <MaterialIcons name="cancel" size={24} color="#F44336" />
                            <Text style={[styles.statTitle, { color: '#F44336' }]}>Absent</Text>
                        </View>
                        <Text style={[styles.statNumber, { color: '#F44336' }]}>{absentCount}</Text>
                        <Text style={styles.statSubtext}>students</Text>
                    </View>
                </View>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Session Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Students:</Text>
                        <Text style={styles.summaryValue}>{session.totalStudents}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Attendance Rate:</Text>
                        <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>{attendanceRate}%</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Absence Rate:</Text>
                        <Text style={[styles.summaryValue, { color: '#F44336' }]}>
                            {(100 - parseFloat(attendanceRate)).toFixed(1)}%
                        </Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressSection}>
                    <Text style={styles.progressTitle}>Attendance Progress</Text>
                    <View style={styles.progressBar}>
                        <View 
                            style={[
                                styles.progressFill, 
                                { width: `${attendanceRate}%` as any }
                            ]} 
                        />
                    </View>
                    <Text style={styles.progressText}>{attendanceRate}% attendance rate</Text>
                </View>

                {/* Additional Info */}
                <View style={styles.additionalInfo}>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="group" size={20} color="#666" />
                        <Text style={styles.infoText}>Class size: {session.totalStudents} students</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="schedule" size={20} color="#666" />
                        <Text style={styles.infoText}>Session ID: {session.id}</Text>
                    </View>
                </View>
            </ScrollView>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a202c'
    },
    placeholder: {
        width: 40
    },
    content: {
        flex: 1,
        padding: 16
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    dateSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateInfo: {
        marginLeft: 12
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748'
    },
    timeText: {
        fontSize: 14,
        color: '#718096',
        marginTop: 2
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    statTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4
    },
    statSubtext: {
        fontSize: 12,
        color: '#718096'
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 16
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    summaryLabel: {
        fontSize: 16,
        color: '#4a5568'
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748'
    },
    progressSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 12
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4
    },
    progressText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center'
    },
    additionalInfo: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    infoText: {
        fontSize: 14,
        color: '#4a5568',
        marginLeft: 12
    }
});
