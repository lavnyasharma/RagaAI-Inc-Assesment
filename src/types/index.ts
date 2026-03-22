// Shared TypeScript types

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'Admitted' | 'Discharged' | 'Under Observation' | 'Critical';
  department: string;
  admissionDate: string;
  avatar?: string;
}

export type ViewMode = 'grid' | 'list';

export interface KPICard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}
