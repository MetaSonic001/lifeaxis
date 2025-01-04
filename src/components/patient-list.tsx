import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const patients = [
  { id: 1, name: "Alice Johnson", age: 32, condition: "Stable" },
  { id: 2, name: "Bob Smith", age: 45, condition: "Critical" },
  { id: 3, name: "Charlie Brown", age: 28, condition: "Stable" },
  { id: 4, name: "Diana Ross", age: 56, condition: "Improving" },
  { id: 5, name: "Edward Norton", age: 41, condition: "Critical" },
]

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
}

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
}

export function PatientList({ onSelectPatient }: PatientListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Condition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} onClick={() => onSelectPatient(patient)} className="cursor-pointer">
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell>{patient.condition}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

