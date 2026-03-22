import { memo } from 'react';
import type { Patient } from '../../../types';
import { User, Calendar, Stethoscope, ChevronRight, Users } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface PatientGridViewProps {
  patients: Patient[];
}

const statusVariantMap: Record<Patient['status'], 'info' | 'success' | 'warning' | 'danger'> = {
  Admitted: 'info',
  Discharged: 'success',
  'Under Observation': 'warning',
  Critical: 'danger',
};

const PatientCard = memo(function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card
      hoverable
      className="group flex flex-col !p-0 overflow-hidden"
    >
      {/* Header with status */}
      <div className="p-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
             {patient.avatar ? (
                <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
             ) : (
                <User className="w-4 h-4 text-zinc-500" />
             )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 leading-tight">
              {patient.name}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">ID: #{patient.id.slice(0, 5)}</p>
          </div>
        </div>
        <Badge variant={statusVariantMap[patient.status]}>
          {patient.status}
        </Badge>
      </div>

      {/* Info bits */}
      <div className="px-5 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
           <div className="w-4 flex justify-center">
             <Stethoscope className="w-3.5 h-3.5 text-zinc-500" />
           </div>
           <span className="truncate">{patient.condition}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
           <div className="w-4 flex justify-center">
             <Calendar className="w-3.5 h-3.5 text-zinc-500" />
           </div>
           <span>Admitted: {patient.admissionDate}</span>
        </div>
      </div>

      {/* Footer action */}
      <div className="mt-auto border-t border-zinc-800/40 bg-zinc-900/30 p-3 flex items-center justify-between">
         <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-2">
           {patient.department}
         </span>
         <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] text-zinc-400 hover:text-primary-500">
           Details <ChevronRight className="w-3 h-3 ml-1" />
         </Button>
      </div>
    </Card>
  );
});

export function PatientGridView({ patients }: PatientGridViewProps) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
           <Users className="w-8 h-8 text-zinc-700" />
        </div>
        <h3 className="text-zinc-100 font-semibold">No patients found</h3>
        <p className="text-sm text-zinc-500 mt-1">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
