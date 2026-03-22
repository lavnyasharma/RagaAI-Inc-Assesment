import { create } from 'zustand';
import type { Patient, ViewMode } from '../../../types';

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  isLoading: boolean;
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  removePatient: (id: string) => void;
  toggleViewMode: () => void;
  setSearchQuery: (query: string) => void;
  fetchPatients: () => void;
}

const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', age: 45, condition: 'Hypertension', status: 'Admitted', department: 'Cardiology', admissionDate: '2024-03-01' },
  { id: '2', name: 'Jane Smith', age: 34, condition: 'Type 2 Diabetes', status: 'Under Observation', department: 'Endocrinology', admissionDate: '2024-03-05' },
  { id: '3', name: 'Robert Johnson', age: 62, condition: 'Recovering from Surgery', status: 'Discharged', department: 'Orthopedics', admissionDate: '2024-02-28' },
  { id: '4', name: 'Emily Davis', age: 28, condition: 'Acute Bronchitis', status: 'Admitted', department: 'Pulmonology', admissionDate: '2024-03-08' },
  { id: '5', name: 'Michael Brown', age: 55, condition: 'Arrhythmia', status: 'Critical', department: 'Cardiology', admissionDate: '2024-03-10' },
  { id: '6', name: 'Sarah Wilson', age: 41, condition: 'Migraine', status: 'Under Observation', department: 'Neurology', admissionDate: '2024-03-11' },
  { id: '7', name: 'Kevin Lee', age: 37, condition: 'Fractured Radius', status: 'Discharged', department: 'Emergency', admissionDate: '2024-03-02' },
  { id: '8', name: 'Lisa Garcia', age: 50, condition: 'Pneumonia', status: 'Admitted', department: 'Pulmonology', admissionDate: '2024-03-09' },
];

export const usePatientStore = create<PatientState>((set) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  isLoading: true,

  fetchPatients: () => {
    set({ isLoading: true });
    setTimeout(() => {
       set({ isLoading: false });
    }, 600);
  },

  addPatient: (patient) =>
    set((state) => ({
      patients: [
        { ...patient, id: Math.random().toString(36).substring(2, 9) },
        ...state.patients,
      ],
    })),

  removePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),

  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'grid' ? 'list' : 'grid',
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// Performance: Selectors
export const usePatients = () => usePatientStore((s) => s.patients);
export const usePatientViewMode = () => usePatientStore((s) => s.viewMode);
export const usePatientSearchQuery = () => usePatientStore((s) => s.searchQuery);
export const usePatientActions = () => usePatientStore((s) => ({
  addPatient: s.addPatient,
  removePatient: s.removePatient,
  toggleViewMode: s.toggleViewMode,
  setSearchQuery: s.setSearchQuery,
  fetchPatients: s.fetchPatients,
}));
