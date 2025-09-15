import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Student } from '../../types';
import { studentStorage } from '../../utils/studentStorage';

interface ImportStudentsScreenProps {
  onStudentsImported?: (students: Student[]) => void;
}

export default function ImportStudentsScreen({ onStudentsImported }: ImportStudentsScreenProps) {
  const [importMethod, setImportMethod] = useState<'manual' | 'file' | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewStudents, setPreviewStudents] = useState<Student[]>([]);

  const parseTextInput = (text: string): Student[] => {
    const lines = text.trim().split('\n');
    const students: Student[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        // Support different formats:
        // 1. "Name,Email" (CSV format)
        // 2. "Name" (simple name list)
        // 3. "Name - Email" (dash separated)
        // 4. "Name | Email" (pipe separated)
        
        let name = '';
        let email = '';
        
        if (trimmedLine.includes(',')) {
          // CSV format
          const parts = trimmedLine.split(',');
          name = parts[0].trim();
          email = parts[1]?.trim() || '';
        } else if (trimmedLine.includes(' - ')) {
          // Dash separated
          const parts = trimmedLine.split(' - ');
          name = parts[0].trim();
          email = parts[1]?.trim() || '';
        } else if (trimmedLine.includes(' | ')) {
          // Pipe separated
          const parts = trimmedLine.split(' | ');
          name = parts[0].trim();
          email = parts[1]?.trim() || '';
        } else {
          // Simple name only
          name = trimmedLine;
        }
        
        if (name) {
          students.push({
            id: `student_${index + 1}`,
            name: name,
            email: email || undefined
          });
        }
      }
    });
    
    return students;
  };

  const handlePreview = () => {
    if (!manualInput.trim()) {
      Alert.alert('Error', 'Please enter some student data first.');
      return;
    }
    
    const students = parseTextInput(manualInput);
    if (students.length === 0) {
      Alert.alert('Error', 'No valid student data found. Please check your format.');
      return;
    }
    
    setPreviewStudents(students);
    setShowPreview(true);
  };

  const handleImport = () => {
    if (previewStudents.length === 0) {
      Alert.alert('Error', 'No students to import.');
      return;
    }
    
    // Save students to storage
    studentStorage.addStudents(previewStudents);
    
    Alert.alert(
      'Success', 
      `Successfully imported ${previewStudents.length} students!\n\nTotal students: ${studentStorage.getTotalCount()}`,
      [
        {
          text: 'OK',
          onPress: () => {
            onStudentsImported?.(previewStudents);
            router.back();
          }
        }
      ]
    );
  };

  const handleFileImport = () => {
    Alert.alert(
      'File Import',
      'File import functionality would be implemented here using expo-document-picker. For now, you can use the manual input method.',
      [{ text: 'OK' }]
    );
  };

  const sampleData = `John Doe, john.doe@email.com
Jane Smith, jane.smith@email.com
Bob Johnson - bob.johnson@email.com
Alice Brown | alice.brown@email.com
Charlie Wilson`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Import Students</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Import Method Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Import Method</Text>
          
          <TouchableOpacity 
            style={[styles.methodButton, importMethod === 'manual' && styles.methodButtonActive]}
            onPress={() => setImportMethod('manual')}
          >
            <MaterialIcons 
              name="edit" 
              size={24} 
              color={importMethod === 'manual' ? '#3d99f5' : '#666'} 
            />
            <View style={styles.methodContent}>
              <Text style={[styles.methodTitle, importMethod === 'manual' && styles.methodTitleActive]}>
                Manual Input
              </Text>
              <Text style={styles.methodDescription}>
                Paste or type student data directly
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.methodButton, importMethod === 'file' && styles.methodButtonActive]}
            onPress={() => {
              setImportMethod('file');
              handleFileImport();
            }}
          >
            <MaterialIcons 
              name="upload-file" 
              size={24} 
              color={importMethod === 'file' ? '#3d99f5' : '#666'} 
            />
            <View style={styles.methodContent}>
              <Text style={[styles.methodTitle, importMethod === 'file' && styles.methodTitleActive]}>
                File Import
              </Text>
              <Text style={styles.methodDescription}>
                Import from TXT or CSV file (Coming Soon)
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Manual Input Section */}
        {importMethod === 'manual' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student Data</Text>
            <Text style={styles.inputDescription}>
              Enter student information. Each line should contain a student's name and optionally their email.
            </Text>
            
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={10}
              placeholder={`Example formats:\n${sampleData}`}
              value={manualInput}
              onChangeText={setManualInput}
              textAlignVertical="top"
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.previewButton]}
                onPress={handlePreview}
              >
                <MaterialIcons name="visibility" size={20} color="#fff" />
                <Text style={styles.buttonText}>Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Format Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Formats</Text>
          <View style={styles.formatCard}>
            <Text style={styles.formatTitle}>CSV Format:</Text>
            <Text style={styles.formatExample}>Name, Email</Text>
            <Text style={styles.formatExample}>John Doe, john@email.com</Text>
          </View>
          
          <View style={styles.formatCard}>
            <Text style={styles.formatTitle}>Dash Separated:</Text>
            <Text style={styles.formatExample}>Name - Email</Text>
            <Text style={styles.formatExample}>Jane Smith - jane@email.com</Text>
          </View>
          
          <View style={styles.formatCard}>
            <Text style={styles.formatTitle}>Pipe Separated:</Text>
            <Text style={styles.formatExample}>Name | Email</Text>
            <Text style={styles.formatExample}>Bob Johnson | bob@email.com</Text>
          </View>
          
          <View style={styles.formatCard}>
            <Text style={styles.formatTitle}>Name Only:</Text>
            <Text style={styles.formatExample}>Alice Brown</Text>
            <Text style={styles.formatExample}>Charlie Wilson</Text>
          </View>
        </View>
      </ScrollView>

      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Preview Students</Text>
            <TouchableOpacity onPress={() => setShowPreview(false)}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.previewList}>
            {previewStudents.map((student, index) => (
              <View key={student.id} style={styles.previewItem}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  {student.email && (
                    <Text style={styles.studentEmail}>{student.email}</Text>
                  )}
                </View>
                <Text style={styles.studentNumber}>#{index + 1}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowPreview(false)}
            >
              <Text style={[styles.buttonText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.importButton]}
              onPress={handleImport}
            >
              <MaterialIcons name="check" size={20} color="#fff" />
              <Text style={styles.buttonText}>Import {previewStudents.length} Students</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 12
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3
  },
  methodButtonActive: {
    borderWidth: 2,
    borderColor: '#3d99f5'
  },
  methodContent: {
    marginLeft: 12,
    flex: 1
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4
  },
  methodTitleActive: {
    color: '#3d99f5'
  },
  methodDescription: {
    fontSize: 14,
    color: '#718096'
  },
  inputDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 12,
    lineHeight: 20
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2d3748',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 200,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3
  },
  previewButton: {
    backgroundColor: '#3d99f5'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  formatCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3
  },
  formatTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8
  },
  formatExample: {
    fontSize: 13,
    color: '#4a5568',
    fontFamily: 'monospace',
    marginBottom: 4
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  modalHeader: {
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c'
  },
  previewList: {
    flex: 1,
    padding: 16
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3
  },
  studentInfo: {
    flex: 1
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4
  },
  studentEmail: {
    fontSize: 14,
    color: '#718096'
  },
  studentNumber: {
    fontSize: 14,
    color: '#3d99f5',
    fontWeight: '600'
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  importButton: {
    flex: 2,
    backgroundColor: '#4CAF50'
  }
});
