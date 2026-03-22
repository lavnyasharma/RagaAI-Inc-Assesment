import { useState, useMemo, useEffect } from 'react';
import { usePatientStore } from './store/patientStore';
import { PatientGridView } from './components/PatientGridView';
import { PatientListView } from './components/PatientListView';
import { Search, Plus, List, LayoutGrid, X } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';
import { Skeleton } from '../../components/ui/Skeleton';

export function PatientsPage() {
  const {
    patients,
    viewMode,
    searchQuery,
    isLoading,
    addPatient,
    toggleViewMode,
    setSearchQuery,
    fetchPatients,
  } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const { success } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    department: '',
  });

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.condition) return;

    addPatient({
      name: newPatient.name,
      age: parseInt(newPatient.age) || 0,
      condition: newPatient.condition,
      department: newPatient.department || 'General',
      status: 'Admitted',
      admissionDate: new Date().toLocaleDateString(),
    });

    success('Patient Enrolled', `${newPatient.name} has been successfully added to the system.`);
    
    setNewPatient({ name: '', age: '', condition: '', department: '' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">Patient Directory</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage and monitor all active and historical patient records.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
             <Button 
               variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
               size="sm" 
               onClick={() => viewMode !== 'grid' && toggleViewMode()}
               className="h-8 w-8 !p-0"
             >
               <LayoutGrid className="w-4 h-4" />
             </Button>
             <Button 
               variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
               size="sm" 
               onClick={() => viewMode !== 'list' && toggleViewMode()}
               className="h-8 w-8 !p-0"
             >
               <List className="w-4 h-4" />
             </Button>
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setShowAddForm(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Patient
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="!p-4 bg-zinc-900/40 border-zinc-800/60 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:max-w-md">
           <Input
             placeholder="Search by name, condition or department..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             leftIcon={<Search className="w-4 h-4" />}
             className="!h-9"
           />
        </div>
        <div className="flex items-center gap-6 ml-auto">
           <div className="hidden lg:block h-6 w-px bg-zinc-800" />
           <p className="text-xs font-medium text-zinc-500">
             Showing <span className="text-zinc-200">{filteredPatients.length}</span> of <span className="text-zinc-200">{patients.length}</span> patients
           </p>
        </div>
      </Card>

      {/* Main View Area */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="space-y-3">
             <Skeleton variant="rect" className="h-16 !rounded-lg" />
             <Skeleton variant="rect" className="h-16 !rounded-lg" />
             <Skeleton variant="rect" className="h-16 !rounded-lg" />
             <Skeleton variant="rect" className="h-16 !rounded-lg" />
             <Skeleton variant="rect" className="h-16 !rounded-lg" />
          </div>
        ) : viewMode === 'grid' ? (
          <PatientGridView patients={filteredPatients} />
        ) : (
          <PatientListView patients={filteredPatients} />
        )}
      </div>

      {/* Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
          <Card className="w-full max-w-md shadow-lg border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-50">Register Patient</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleAddPatient} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. John Doe"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Age"
                  type="number"
                  placeholder="25"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  required
                />
                <Input
                  label="Department"
                  placeholder="e.g. Cardiology"
                  value={newPatient.department}
                  onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
                />
              </div>

              <Input
                label="Condition"
                placeholder="e.g. Acute Bronchitis"
                value={newPatient.condition}
                onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                required
              />

              <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-zinc-800">
                <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Confirm Admission
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
