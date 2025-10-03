import { MoreHorizontal, Download, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
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
import { mockSessions, mockPatients, mockUsers } from "@/lib/data";
import { Header } from "@/components/header";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function ManagementReportsPage() {
  return (
    <>
    <Header title="Management Reports" />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Patient Sessions</CardTitle>
              <CardDescription>
                View all patient sessions across the system.
              </CardDescription>
            </div>
             <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !Date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Filter by date
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                    mode="range"
                    numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Session Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>AI Report Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map(session => {
                  const patient = mockPatients.find(p => p.id === session.patientId);
                  const doctor = mockUsers.find(u => u.id === session.doctorId);
                  return (
                    <TableRow key={session.id}>
                        <TableCell className="font-medium">{patient?.name || 'N/A'}</TableCell>
                        <TableCell>{format(new Date(session.date), "PPP")}</TableCell>
                        <TableCell>{doctor?.name || 'N/A'}</TableCell>
                        <TableCell>
                            {session.aiReportId ? <Badge>Generated</Badge> : <Badge variant="secondary">Not Generated</Badge>}
                        </TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-3.5 w-3.5" />
                                View PDF
                            </Button>
                        </TableCell>
                    </TableRow>
                  );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
