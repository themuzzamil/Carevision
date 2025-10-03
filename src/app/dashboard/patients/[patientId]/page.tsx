import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MoreHorizontal, PlusCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockPatients, mockSessions, mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";

export default function PatientDetailPage({ params }: { params: { patientId: string } }) {
    const patient = mockPatients.find(p => p.id === params.patientId);
    if (!patient) {
        notFound();
    }

    const sessions = mockSessions.filter(s => s.patientId === patient.id);
    const doctor = mockUsers.find(u => u.id === patient.createdBy);

  return (
    <>
    <Header title={`${patient.name}'s Record`} />
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-1">
            <Card>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                        <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <CardTitle>{patient.name}</CardTitle>
                        <CardDescription>{patient.contact}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="font-medium text-muted-foreground">Age</div>
                        <div>{patient.age}</div>
                        <div className="font-medium text-muted-foreground">Gender</div>
                        <div>{patient.gender}</div>
                        <div className="font-medium text-muted-foreground">Primary Doctor</div>
                        <div>{doctor?.name || 'N/A'}</div>
                        <div className="font-medium text-muted-foreground">Joined Date</div>
                        <div>{format(new Date(patient.createdAt), "MMMM d, yyyy")}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medical Sessions</CardTitle>
                  <CardDescription>
                    A log of all medical sessions for {patient.name}.
                  </CardDescription>
                </div>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Session
                    </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>AI Report</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map(session => {
                      const sessionDoctor = mockUsers.find(u => u.id === session.doctorId);
                      return (
                        <TableRow key={session.id}>
                            <TableCell className="font-medium">{format(new Date(session.date), "PPP")}</TableCell>
                            <TableCell>{sessionDoctor?.name || 'N/A'}</TableCell>
                            <TableCell>
                                {session.aiReportId ? <Badge>Generated</Badge> : <Badge variant="secondary">Not Generated</Badge>}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <Link href={`/dashboard/patients/${patient.id}/sessions/${session.id}`}>
                                        <DropdownMenuItem>View Session</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>Generate PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
    </div>
    </>
  )
}
