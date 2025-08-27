export interface Student {
    id: string,
    name: string,
    email?: string
}

export interface AttendanceRecord {
    studentId: string,
    status: 'present' | 'absent',
    timestamp: Date
}

export interface AttendanceSession {
    id: string;
    date: Date;
    records: AttendanceRecord[];
    totalStudents: number;
    presentCount: number;
}

