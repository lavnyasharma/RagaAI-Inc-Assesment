import type { Patient } from '../../../types';
import { User, MoreVertical, ChevronRight } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface PatientListViewProps {
  patients: Patient[];
}

const statusVariantMap: Record<Patient['status'], 'info' | 'success' | 'warning' | 'danger'> = {
  Admitted: 'info',
  Discharged: 'success',
  'Under Observation': 'warning',
  Critical: 'danger',
};

export function PatientListView({ patients }: PatientListViewProps) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
           <User className="w-8 h-8 text-zinc-700" />
        </div>
        <h3 className="text-zinc-100 font-semibold">No patients found</h3>
        <p className="text-sm text-zinc-500 mt-1">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="surface-card rounded-xl overflow-hidden border border-zinc-800/60 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-zinc-900 shadow-sm border-b border-zinc-800">
            <tr className="border-b border-zinc-800">
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4">
                Patient Info
              </th>
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4">
                Condition
              </th>
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4">
                Department
              </th>
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4">
                Admission
              </th>
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4">
                Status
              </th>
              <th className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="group hover:bg-zinc-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-100 leading-tight">
                        {patient.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Age: {patient.age}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                    {patient.condition}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {patient.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-400 font-medium">
                  {patient.admissionDate}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariantMap[patient.status]}>
                    {patient.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-zinc-500 hover:text-zinc-200">
                      View <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
