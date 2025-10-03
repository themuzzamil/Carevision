'use client';

import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockPatients, mockSessions, mockUsers, mockAiAnalyses } from "@/lib/data";
import { Header } from "@/components/header";
import { Bot, FileUp, FileText, Loader2, Sparkles } from "lucide-react";
import { useState, use } from "react";
import { useToast } from "@/hooks/use-toast";
import type { GenerateClinicalReportOutput } from "@/ai/flows/generate-clinical-report";
import { generateClinicalReport } from "@/ai/flows/generate-clinical-report";
import { AiReportDisplay } from "@/components/ai-report-display";

export default function SessionDetailPage({ params: paramsPromise }: { params: Promise<{ patientId: string; sessionId: string }> }) {
    const params = use(paramsPromise);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [aiResult, setAiResult] = useState<GenerateClinicalReportOutput | null>(mockAiAnalyses.find(a => a.sessionId === params.sessionId) || null);
    const [doctorNotes, setDoctorNotes] = useState(mockSessions.find(s => s.id === params.sessionId)?.notes || '');
    const [reportText, setReportText] = useState("Blood Test Results:\n- Hemoglobin: 14.5 g/dL (Normal)\n- Cholesterol, Total: 210 mg/dL (High)\n- Glucose: 95 mg/dL (Normal)\n\nPatient reports persistent headaches for the last 3 weeks, primarily in the temporal region.");

    const patient = mockPatients.find(p => p.id === params.patientId);
    const session = mockSessions.find(s => s.id === params.sessionId);
    if (!patient || !session) {
        notFound();
    }
    const doctor = mockUsers.find(u => u.id === session.doctorId);

    const handleRunAnalysis = async () => {
        setIsLoading(true);
        try {
            const patientDetails = `Name: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}`;
            const result = await generateClinicalReport({
                patientDetails,
                reportText: reportText,
                doctorNotes: doctorNotes,
            });
            setAiResult(result);
            toast({
                title: "AI Analysis Complete",
                description: "The clinical report has been successfully generated.",
            });
        } catch (error) {
            console.error("AI Analysis failed:", error);
            toast({
                variant: "destructive",
                title: "AI Analysis Failed",
                description: "There was an error generating the clinical report. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGeneratePdf = () => {
        toast({
            title: "PDF Generated",
            description: `Report for ${patient.name} on ${format(new Date(session.date), "PPP")} has been generated.`,
        });
    };

  return (
    <>
      <Header title={`Session: ${format(new Date(session.date), "PPP")}`} />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="font-medium text-muted-foreground">Patient</div>
                        <div>{patient.name}</div>
                        <div className="font-medium text-muted-foreground">Date</div>
                        <div>{format(new Date(session.date), "MMMM d, yyyy 'at' h:mm a")}</div>
                        <div className="font-medium text-muted-foreground">Doctor</div>
                        <div>{doctor?.name || 'N/A'}</div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Uploaded Reports & Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="report-text">Uploaded Report Text (Simulated)</Label>
                        <Textarea id="report-text" value={reportText} onChange={(e) => setReportText(e.target.value)} rows={8} />
                    </div>
                    <div>
                        <Label htmlFor="doctor-notes">Doctor's Notes</Label>
                        <Textarea id="doctor-notes" value={doctorNotes} onChange={(e) => setDoctorNotes(e.target.value)} placeholder="Enter your notes for this session..." rows={5} />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><FileUp className="mr-2 h-4 w-4" /> Upload Files</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>AI Assistant</CardTitle>
                    <CardDescription>Generate a clinical report based on the provided data.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button onClick={handleRunAnalysis} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Run AI Analysis
                    </Button>
                    <Button onClick={handleGeneratePdf} variant="secondary" disabled={!aiResult}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate & View PDF
                    </Button>
                </CardContent>
            </Card>

            {isLoading && (
                <Card className="flex flex-col items-center justify-center p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <CardTitle>Generating Report...</CardTitle>
                    <CardDescription>CareVision AI is analyzing the data. This may take a moment.</CardDescription>
                </Card>
            )}
            
            {aiResult && !isLoading && <AiReportDisplay report={aiResult} />}

            {!aiResult && !isLoading && (
                 <Card className="flex flex-col items-center justify-center p-8 text-center">
                    <Bot className="h-8 w-8 text-muted-foreground mb-4" />
                    <CardTitle>Awaiting Analysis</CardTitle>
                    <CardDescription>Click "Run AI Analysis" to generate the clinical report.</CardDescription>
                </Card>
            )}
        </div>
      </div>
    </>
  );
}
