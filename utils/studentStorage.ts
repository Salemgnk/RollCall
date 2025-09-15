import { Student } from '../types';

// Simple in-memory storage for demo purposes
// In a real app, you'd use AsyncStorage, SQLite, or a backend API
let students: Student[] = [
  // Default students for demo
  {
    id: 'student_1',
    name: 'John Doe',
    email: 'john.doe@example.com'
  },
  {
    id: 'student_2', 
    name: 'Jane Smith',
    email: 'jane.smith@example.com'
  },
  {
    id: 'student_3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com'
  }
];

export const studentStorage = {
  // Get all students
  getAllStudents: (): Student[] => {
    return [...students];
  },

  // Add new students
  addStudents: (newStudents: Student[]): void => {
    students = [...students, ...newStudents];
  },

  // Replace all students
  setStudents: (newStudents: Student[]): void => {
    students = [...newStudents];
  },

  // Get student by ID
  getStudentById: (id: string): Student | undefined => {
    return students.find(student => student.id === id);
  },

  // Get total count
  getTotalCount: (): number => {
    return students.length;
  },

  // Clear all students
  clearAll: (): void => {
    students = [];
  }
};
